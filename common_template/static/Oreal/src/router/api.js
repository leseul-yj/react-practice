import { ApiFetch } from './apiFetch';
//import { API_HOST } from '../config';
import errorMap from './errorMap';

const Api = new ApiFetch();
const createErrorWatch = function(callback) {
    return (...args) => {
        const req = callback.apply(Api, args);
        const oldSubscribe = req.subscribe.bind(req);
        req.subscribe = (nextFnOrO, errorFn, completeFn) => {
            if (nextFnOrO) {
                let next = () => {};
                let error = () => {};
                let complete = () => {};
                if (typeof nextFnOrO === 'function') {
                    next = nextFnOrO;
                    error = errorFn || error;
                    complete = completeFn || complete;
                } else {
                    next = nextFnOrO.next || next;
                    error = nextFnOrO.error || error;
                    complete = nextFnOrO.complete || complete;
                }
                oldSubscribe({
                    next(rs)  {
                        if (rs.success === false) {
                            let description = '';
                            if (rs.code in errorMap[AppConfig.language]) {
                                description =
                                    errorMap[AppConfig.language][rs.code];
                            } else {
                                description =
                                    errorMap[AppConfig.language]['E_INTERNAL'];
                            }
                            Notification.error({
                                message: 'Error',
                                description
                            });
                        }
                        if('isStopped' in nextFnOrO){
                            next.bind(nextFnOrO)(rs);
                        }else{
                            next.bind(this)(rs);
                        }
                        
                    },
                    complete(){
                        if('isStopped' in nextFnOrO){
                            complete.bind(nextFnOrO)();
                        }else{
                            complete.bind(this)();
                        }
                    },
                    error(){
                        if('isStopped' in nextFnOrO){
                            error.bind(nextFnOrO)();
                        }else{
                            error.bind(this)();
                        }
                    },
                });
            }
        };
        return req;
    };
};


Api.getRealtimeData = createErrorWatch(function(data) {
    return this.post('/analysis/startWorkspaceDataGenPieChart', data);
});

Api.searchTemplateData = createErrorWatch(function(query) {
    return this.get(`dhive/v1/template/search?`, query);
});



export default Api;
