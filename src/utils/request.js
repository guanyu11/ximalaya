export default (options)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:options.method || "GET",
            url:options.url,
            data:options.data,
            headers:options.headers || {},
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err)
            }
        })
    })
}



