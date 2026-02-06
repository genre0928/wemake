// 사용자 URL의 위치에 따라 렌더링할 내용을 정의하여 React Router가 찾아서 렌더링할 수 있도록 함
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("common/pages/home-page.tsx")] satisfies RouteConfig;
