import db from '../../db';

export const searchService = (q) => {
    return db.get('users').filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();
};