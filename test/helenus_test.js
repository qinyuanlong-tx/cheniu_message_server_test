/**
 * Created by yuanlong.qyl on 14-3-31.
 */

var helenus = require('helenus'),
    pool = new helenus.ConnectionPool({
        hosts      : ['10.0.0.53:9160'],
        keyspace   : 'test001',
        timeout    : 3000
        //cqlVersion : '3.0.0' // specify this if you're using Cassandra 1.1 and want to use CQL 3
    });

pool.on('error', function(err){
    console.error(err.name, err.message);
});

pool.connect(function(err, keyspace){
    if(err){
        throw(err);
    } else {
        //to use cql, access the pool object once connected
        //the first argument is the CQL string, the second is an `Array` of items
        //to interpolate into the format string, the last is the callback
        //for formatting specific see `http://nodejs.org/docs/latest/api/util.html#util.format`
        //results is an array of row objects



        //NOTE:
        //- You can always skip quotes around placeholders, they are added automatically.
        //- In CQL 3 you cannot use placeholders for ColumnFamily names or Column names.
    }
});


function test_query(){
    pool.cql("SELECT user_id,name FROM users",[], function(err, results){
        console.log(results);
        results.forEach(function(row){
            //gets the 5th column of each row
            console.log(row[0]);
        });
    });
}

function test_updata(){
//    pool.cql("UPDATE users")
}