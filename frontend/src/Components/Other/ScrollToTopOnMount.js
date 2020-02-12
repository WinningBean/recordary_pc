import React from 'react'
/**
 * 마운트 완료시 스크롤을 최상단으로 옮기고 싶은 페이지에서 렌더링하는
 * 컴포넌트에 추가한다.
 *
 * @class ScrollToTopOnMount
 * @extends {React.Component}
 */
class ScrollToTopOnMount extends React.Component {
    componentDidMount(prevProps) {
        window.scrollTo(0, 0);
    }

    render() {
        return null;
    }
}

export default ScrollToTopOnMount;