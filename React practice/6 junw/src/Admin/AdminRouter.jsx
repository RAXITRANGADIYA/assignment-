// import React  from 'react';
import { useRoutes } from 'react-router-dom';
import AdminLayoutCompo from './layout/AdminLayoutCompo.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminAllUsers from './AdminAllUsers.jsx';
import AdminUsersUpdate from './AdminUsersUpdate.jsx';

const AdminRouter = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <AdminLayoutCompo />,
            children: [
                {
                    path: "dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "adminallusers",
                    element: <AdminAllUsers />,
                },
                {
                    path: "updateuser/:id",
                    element: <AdminUsersUpdate />,
                }
            ],
        }
    ]);
    return routes;
};

export default AdminRouter;