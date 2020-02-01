package com.fairy_pitt.recordary.config.database;

import com.zaxxer.hikari.HikariConfig;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Getter
@Setter
@Configuration
@PropertySource("classpath:/database/database-${spring.profiles.active}.properties")
@ConfigurationProperties(prefix = "datasource.slave")
@Profile("!test")
public class SlaveDataSourceConfig extends HikariConfig { }