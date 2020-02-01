package com.fairy_pitt.recordary.config.database;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages = "com.fairy_pitt.recordary.common")
@EnableTransactionManagement
@EnableJpaAuditing
@EnableConfigurationProperties({MasterDataSourceConfig.class, SlaveDataSourceConfig.class})
@Profile("!test")
public class DataSourceConfig {
    private static final String PROMOTION_PERSISTENCE_UNIT_NAME = "recordary";

    @Bean
    @Primary
    public DataSource dataSource(MasterDataSourceConfig masterDataSourceConfig, SlaveDataSourceConfig slaveDataSourceConfig) {

        DataSource masterDataSource = new HikariDataSource(masterDataSourceConfig);
        DataSource slaveDataSource = new HikariDataSource(slaveDataSourceConfig);

        Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put("slave", slaveDataSource);
        dataSourceMap.put("master", masterDataSource);

        ReplicationRoutingDataSource routingDataSource = new ReplicationRoutingDataSource();
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(masterDataSource);
        routingDataSource.afterPropertiesSet();

        return new LazyConnectionDataSourceProxy(routingDataSource);
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, JpaProperties jpaProperties) {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setShowSql(true);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.fairy_pitt.recordary.common");
        factory.setPersistenceUnitName(PROMOTION_PERSISTENCE_UNIT_NAME);

        Properties properties = new Properties();
        HibernateSettings hibernateSettings = new HibernateSettings()
                .ddlAuto(() -> "none");
        properties.putAll(new HibernateProperties().determineHibernateProperties(jpaProperties.getProperties(), hibernateSettings));
        factory.setJpaProperties(properties);

        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}