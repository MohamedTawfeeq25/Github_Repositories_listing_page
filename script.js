var fet=()=>{
	fetch("https://api.github.com/users/MohamedTawfeeq25")
	.then(res=>res.json())
	.then(res=>{
		document.getElementById("bio").textContent=res.bio;
		document.getElementById("username").textContent=res.name;
		document.getElementById("git").textContent=res.html_url;
		document.getElementById("location").textContent=res.location;
		document.getElementById("img").src=res.avatar_url;
		document.getElementById("git").href=res.html_url;
	})
	.catch((err)=>{console.log(err)});

	fetch("https://api.github.com/users/MohamedTawfeeq25/repos")
	.then(res=>res.json())
	.then(res=>{console.log(res);
	})
	.catch((err)=>{console.log(err)});
}
fet();