const PORT = process.env.PORT || 5005 ;
const express =require('express');
const mustacheexpress = require('mustache-express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const app = express();

const mustache = mustacheexpress();
const bodyParser = require('body-parser');
const  {Client,Pool} = require('pg');
const { response } = require('express');
mustache.cache=null;
app.engine('mustache',mustache);
app.set('view engine','mustache');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());


app.get('/register',(request,response)=>{
    response.render('register');

})
app.get('/login',(request,response)=>{
    response.render('login');

})
app.get('/',(request,response)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }

    });
    client.connect()
    .then(()=>{
        return client.query('select * from register');
        
    })
    .then((results)=>{
        console.log('results?',results);
        response.render('index',results);
    });
    
    });
app.get('/Bedroom',(request,response)=>{
    response.render('Bedroom');

})
app.get('/admin-error',(request,response)=>{
    response.render('admin error');
})
app.get('/Living-room',(request,response)=>{
    response.render('Living room');

})
app.get('/welcome',(request,response)=>{
    response.render('welcome');

})

app.get('/kitchen',(request,response)=>{
    response.render('kitchens');
})

app.get('/Kids',(request,response)=>{
    response.render('Kids');

})
app.get('/Custom-modular-Kitchen',(request,response)=>{
    response.render('Custom modular kitchens');

})
app.get('/Custom-modular-Wardrobe',(request,response)=>{
    response.render('Custom Modular Wardrobe');

})

app.get('/Refer-a-friend',(request,response)=>{
    response.render('Refer a friend');

})
app.get('/About-us',(request,response)=>{
    response.render('About Us');

})
app.get('/book-online',(request,response)=>{
    response.render('book online');
})
app.get('/add',(request,response)=>{
    response.render('book online');
})
app.get('/appointment',(request,response)=>{
    response.render('Appointment time');
})

app.get('/admin-activity',(request,response)=>{
    response.render('admin-activity');
})
app.post('/appointment/add',(request,response)=>{
    console.log('post body',request.body);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect()
    .then(()=>{
        console.log('Connection complete');
        const sql= 'INSERT INTO appointments(email,date_time) VALUES ($1,$2)'
        user_name=request.body.email;
        const params = [request.body.email,request.body.date_time];
        return client.query(sql,params);
        
    })
    .then((result)=>{
        console.log('results?',result);
        response.redirect('/admin-dashboard');
    });
});

app.post('/thanks/add', async function (req, res) {
		
    try{
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
                });
      client.connect()
        await JSON.stringify(client.query('SELECT customerid FROM "bookonline" WHERE "email"=$1', [req.body.email], function(err, result) {
            if(result.rows[0]){
                res.redirect('/Booking-error')
            }
            else{
                client.query('INSERT INTO bookonline(name,email,phone_number,kitchenid,bedroomid,livingroomid,kidsroomid) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.name,req.body.email,req.body.phone_number,req.body.kitchenid,req.body.bedroomid,req.body.livingroomid,req.body.kidsroomid], function(err, result) {
                    if(err){console.log(err);}
                    else {
                    
                    client.query('COMMIT')
                        console.log(result)
                       
                        res.redirect('/thanks');
                        return;
                    }
                });
                
                
            }
            
        }));
        
    } 
    catch(e){throw(e)}
});
app.get('/list',(request,response)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }

    });
    client.connect()
    .then(()=>{
        return client.query('select * from bookonline');
        
    })
    .then((results)=>{
        console.log('results?',results);
        response.render('list',results);
    });
    
    });
    app.get('/admin-dashboard',(request,response)=>{
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    
        });
        client.connect()
        .then(()=>{
            return client.query('select * from bookonline');
            
        })
        .then((results)=>{
            console.log('results?',results);
            response.render('admin-dashboard',results);
        });
        
        });
        app.get('/Appointment-list',(request,response)=>{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
        
            });
            client.connect()
            .then(()=>{
                return client.query('select * from appointments order by date_time');
                
            })
            .then((results)=>{
                console.log('results?',results);
                response.render('Appointment list',results);
            });
            
            });
            app.get('/Appointment-list2',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
            
                });
                client.connect()
                .then(()=>{
                    return client.query('select * from appointments order by date_time'); 
                    
                })
                .then((results)=>{
                    console.log('results?',results);
                    response.render('Appointment list2',results);
                });
                
                });
        app.get('/register-list',(request,response)=>{
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                  rejectUnauthorized: false
                }
        
            });
            client.connect()
            .then(()=>{
                return client.query('select * from register');
                
            })
            .then((results)=>{
                console.log('results?',results);
                response.render('registerlist',results);
            });
            
            });
            app.post('/records/delete/:id',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
        
            
                });
                client.connect()
                .then(()=>{
                    const sql= 'DELETE FROM bookonline where customerid = $1'
                    const params = [request.params.id];
                    return client.query(sql,params);
                    
                })
                .then((results)=>{
                    response.redirect('/admin-dashboard');
                });
            
            });
            app.get('/records/edit/:id',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
            
                });
                client.connect()
                .then(()=>{
                    const sql= 'SELECT * FROM bookonline WHERE customerid = $1'
                    const params = [request.params.id];
                    return client.query(sql,params);
                    
                })
                .then((results)=>{
                    console.log('results?',results)
                    response.render('records-edit',{records:results.rows[0]});
                });
            
            
            
            })
            app.post('/records/edit/:id',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
            
                });
                client.connect()
                .then(()=>{
                    const sql= 'UPDATE bookonline SET name=$1, email=$2, phone_number=$3 WHERE customerid=$4'
                    const params = [request.body.name,request.body.email,request.body.phone_number,request.params.id];
                    return client.query(sql,params);
                    
                })
                .then((results)=>{
                    console.log('results?',results)
                    response.redirect('/admin-dashboard');
                });
            
            })
            app.get('/appoints/edit/:id',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                });
                client.connect()
                .then(()=>{
                    const sql= 'SELECT * FROM appointments  WHERE email = $1'
                    const params = [request.params.id];
                    return client.query(sql,params);
                    
                })
                .then((results)=>{
                    console.log('results?',results)
                    response.render('appointment-edit',{appoints:results.rows[0]});
                });
            
            
            
            })
            app.post('/appoints/edit/:id',(request,response)=>{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
            
                });
                client.connect()
                .then(()=>{
                    const sql= 'UPDATE appointments SET date_time=$1 WHERE email=$2'
                    const params = [request.body.date_time,request.params.id];
                    return client.query(sql,params);
                    
                })
                .then((results)=>{
                    console.log('results?',results)
                    response.redirect('/appointment-list2');
                });
            
            })
        app.post('/register/add', async function (req, res) {
		
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                        });
              client.connect()
                await JSON.stringify(client.query('SELECT cid FROM "register" WHERE "email"=$1', [req.body.email], function(err, result) {
                    if(result.rows[0]){
                        res.redirect('/Registration-error')
                    }
                    else{
                        client.query('INSERT INTO register(full_name,email,password) VALUES ($1, $2, $3)', [req.body.full_name,req.body.email,req.body.password], function(err, result) {
                            if(err){console.log(err);}
                            else {
                            
                            client.query('COMMIT')
                                console.log(result)
                               
                                res.redirect('/');
                                return;
                            }
                        });
                        
                        
                    }
                    
                }));
                
            } 
            catch(e){throw(e)}
        });
        app.post('/login/add', async function (req, res) {
		
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                        });
              client.connect()
                await JSON.stringify(client.query('SELECT cid FROM "register" WHERE "email"=$1', [req.body.email], function(err, result) {
                    if(result.rows[0]){
                        res.redirect('/')
                        
                    }
                    else{
                     res.redirect('/Login-error');
                        
                    }
                    
                }));
                
            } 
            catch(e){throw(e)}
        });
        app.post('/admin/add', async function (req, res) {
		
            try{
                const client = new Client({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                      rejectUnauthorized: false
                    }
                        });
              client.connect()
                await JSON.stringify(client.query('SELECT sid FROM "admin_security" WHERE "security_key"=$1', [req.body.security_key], function(err, result) {
                    if(result.rows[0]){
                        res.redirect('/admin-activity')
                        
                    }
                    else{
                     res.redirect('/admin-error');
                        
                    }
                    
                }));
                
            } 
            catch(e){throw(e)}
        });
      
app.get('/thanks',(request,response)=>{
    response.render('thanks for booking');
})
app.get('/Booking-error',(request,response)=>{
    response.render('Error');
})
app.get('/Registration-error',(request,response)=>{
    response.render('Error2');
})
app.get('/Login-error',(request,response)=>{
    response.render('Error3');
})
app.get('/sign',(request,response)=>{
    response.render('sign');
})
app.get('/admin',(request,response)=>{
    response.render('admin');
})



app.get('/kitchen/Estelle-L-shaped-Kitchen',(request,response)=>{
    response.render('Estelle L-shape kitchen');

})

app.get('/give-ratings',(request,response)=>{
    response.render('giveratings');

})
app.get('/kitchen/Aspen-L-shaped-Kitchen',(request,response)=>{
    response.render('Aspen L-shaped Kitchen');

})
app.get('/rating',(request,response)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }

    });
    client.connect()
    .then(()=>{
        return client.query('select * from ratings;select COUNT(email) from ratings;SELECT CAST(AVG(Rating) AS DECIMAL(10,2)) from ratings;');//showing all data 
        
    })
    .then((results)=>{
        console.log('?results',results[0]);
        console.log('?results',results[1]);
        response.render('rating',{n1:results[0].rows,n2:results[1].rows,n3:results[2].rows});
    });
    
    });
app.post('/rating/add',(request,response)=>{
    console.log('post body',request.body);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect()
    .then(()=>{
        console.log('Connection complete');
        const sql= 'INSERT INTO ratings(email,rating,comment) VALUES ($1, $2, $3)'
        const params = [request.body.email,request.body.rating,request.body.comment];
        return client.query(sql,params);
    })
    .then((result)=>{
       
        console.log('results?',result);
        response.redirect('/thanks');
    })
  
});
app.get('/kitchen/Chloe-Kitchen',(request,response)=>{
    response.render('Chloe Kitchen with island counter');

})
app.get('/kitchen/Carmen-Straight-Kitchen',(request,response)=>{
    response.render('Carmen Straight Kitchen');

})
app.get('/kitchen/Jamie-Parallel-Kitchen',(request,response)=>{
    response.render('Jamie Parallel Kitchen');

})
app.get('/kitchen/Abigail-U-Shaped-Kitchen',(request,response)=>{
    response.render('Abigail U Shaped Kitchen');

})
app.get('/kitchen/Portland-U-Shaped-Kitchen',(request,response)=>{
    response.render('Portland U Shaped Kitchen');

})
app.get('/kitchen/Shelby-L-Shaped-Kitchen',(request,response)=>{
    response.render('Shelby L Shaped Kitchen');

})
app.get('/kitchen/Sienna-Parallel-Modular-Kitchen',(request,response)=>{
    response.render('Sienna Parallel Modular Kitchen');

})
app.get('/Bedroom/Contemporary-Cluster-Guest-Bedroom',(request,response)=>{
    response.render('Contemporary Cluster Guest Bedroom');

})
app.get('/Bedroom/Contemporary-Fusion-Guest-Room',(request,response)=>{
    response.render('Contemporary Fusion Guest Room');

})
app.get('/Bedroom/Serene-Chic-Guest-Bedroom',(request,response)=>{
    response.render('Serene Chic Guest Bedroom');

})
app.get('/Bedroom/Contemporary-Fusion-Guest-Room',(request,response)=>{
    response.render('Contemporary Fusion Guest Room');

})

app.get('/Bedroom/Peppy-Elegant-Guest-Bedroom',(request,response)=>{
    response.render('Peppy Elegant Guest Bedroom');

})
app.get('/Bedroom/Sand-Contemporary-Master-Bedroom',(request,response)=>{
    response.render('Sand Contemporary Master Bedroom');

})
app.get('/Bedroom/Modern-Sleek-Master-Bedroom',(request,response)=>{
    response.render('Modern Sleek Master Bedroom');

})
app.get('/Bedroom/Contemporary-Spring-Guest-Bedroom',(request,response)=>{
    response.render('Contemporary Spring Guest Bedroom');

})
app.get('/Bedroom/Electric-Red-Master-Bedroom',(request,response)=>{
    response.render('Electric Red Master Bedroom');

})
app.get('/Bedroom/Retro-Fusion-Guest-Bed-Room',(request,response)=>{
    response.render('Retro Fusion Guest Bed Room');

})
app.get('/Living-room/Kaleidoscope',(request,response)=>{
    response.render('Kaleidoscope');

})
app.get('/Living-room/Vanilla-Twilight',(request,response)=>{
    response.render('Vanilla Twilight');

})
app.get('/Living-room/Palais-Chic',(request,response)=>{
    response.render('Palais Chic');

})
app.get('/Living-room/Aqua-Delight',(request,response)=>{
    response.render('Aqua Delight');

})
app.get('/Living-room/Serene-Summer',(request,response)=>{
    response.render('Serene Summer');

})
app.get('/Living-room/Artistic-Intrigue',(request,response)=>{
    response.render('Artistic Intrigue');

})
app.get('/Living-room/Urban-Solace',(request,response)=>{
    response.render('Urban Solace');

})
app.get('/Living-room/Spring-Fever',(request,response)=>{
    response.render('Spring Fever');

})
app.get('/Living-room/Teal-Meadows',(request,response)=>{
    response.render('Teal Meadows');

})
app.get('/Kids/Vibrant-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Vibrant Kids Bedroom Interior Design');

})
app.get('/Kids/Alluring-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Alluring Kids Bedroom Interior Design');

})
app.get('/Kids/Cosy-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Cosy Kids Bedroom Interior Design');

})
app.get('/Kids/Olive-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Olive Kids Bedroom Interior Design');

})
app.get('/Kids/Bespangled-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Bespangled Kids Bedroom Interior Design');
})
app.get('/Kids/Acacia-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Acacia Kids Bedroom Interior Design');
})
app.get('/Kids/Bisque-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Bisque Kids Bedroom Interior Design');
})
app.get('/Kids/Serene-Kids-Bedroom-Interior-Design',(request,response)=>{
    response.render('Serene Kids Bedroom Interior Design');
})
app.get('/Kids/Perky-Kids-Bedroom-Design',(request,response)=>{
    response.render('Perky Kids Bedroom Design');
})
app.listen(PORT,()=>{
    console.log('Listening');
})