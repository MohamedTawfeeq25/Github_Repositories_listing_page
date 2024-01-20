var fet=()=>{
	fetch("https://api.github.com/users/MohamedTawfeeq25")
	.then(res=>res.json())
	.then(res=>{
		console.log(res);
	})
	.catch((err)=>{console.log(err)});

	fetch("https://api.github.com/users/MohamedTawfeeq25/repos")
	.then(res=>res.json())
	.then(res=>{console.log(res);
	})
	.catch((err)=>{console.log(err)});
}
fet();