import { useRouter } from "next/router";

export const useRouterQuery = <T>(prop: string) => {
  const router = useRouter();
  return router.query[prop] as T;
};

export default useRouterQuery;
