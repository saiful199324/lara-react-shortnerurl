import Dashboard from '../components/admin/Dashboard';
import URL from '../components/admin/Short_URL';
import AddURL from '../components/admin/InputShortner';

const routes =[
    {path: '/admin', exact:true, name: 'Admin'},
    {path: '/dashboard', exact:true, name: 'Dashboard', component: Dashboard},
    {path: '/short-url', exact:true, name: 'URL', component: URL},
    {path: '/add-short-url', exact:true, name: 'AddURL', component: AddURL},
];

// console.log(routes);

export default routes;