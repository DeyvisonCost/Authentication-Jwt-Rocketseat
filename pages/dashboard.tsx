import { useContext, useEffect } from "react"
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const useCanSeeMetrics = useCan({
    permissions: ['metrics.list'],
    roles: ['administrator', 'editor']
  });

  useEffect(() => {
    api.get('/me')
      .then(response => console.log('response dashboard', response))
      .catch(error => console.log(error))
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>SignOut</button>
      <Can permissions={['metrics.list']} roles={['administrator']}>
        <div>Métricas para quem tem todas as permissões e é administrador ou editor</div>
      </Can>

    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response.data);

  return {
    props: {}
  }

});