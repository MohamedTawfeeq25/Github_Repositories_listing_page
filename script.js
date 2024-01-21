
var total_repo=0;
var page=1;
var profile=(fet)=>{
	fetch("https://api.github.com/users/MohamedTawfeeq25")
	.then(res=>res.json())
	.then(res=>{
		console.log(res);
		total_repo=res.public_repos;
		document.getElementById("bio").textContent=res.bio;
		document.getElementById("fl").textContent=res.followers;
		document.getElementById("fo").textContent=res.following;
		document.getElementById("username").textContent=res.name;
		document.getElementById("git").textContent=res.html_url;
		document.getElementById("location").textContent=res.location;
		document.getElementById("img").src=res.avatar_url;
		document.getElementById("git").href=res.html_url;
	})
	
	.catch((err)=>{console.log(err)});
	setTimeout(()=>{
		fet();
	},1000);
}
document.addEventListener('keydown',(e)=>{
	if(e.key=='Enter'){
		var input=document.getElementById('search');
		if(input.value==''){
			input.focus();
		}
		else{
			document.getElementById("loadCont").style="display:flex";
			var repo_name=[];
	var repo_description=[];
	var language=[];
	
	var count=0;
	var parent=document.getElementById("repo-section");
	parent.innerHTML='';
	fetch('https://api.github.com/search/repositories?q=MohamedTawfeeq25/'+input.value)
	.then(res=>res.json())
	.then(res=>{count=res.items.length;
		console.log(res);
		if(count==0){
			var a=document.getElementById("repo-section");
			var f=document.createElement("div");
			f.setAttribute("id","error");
			f.textContent="OOPS!! Not Found Check the name of the repo.";
			a.appendChild(f);
		}
		else{
		for(var i=0;i<count;i++){
			repo_name.push(res.items[i].name);
			repo_description.push(res.items[i].description);
			
			language.push(res.items[i].language);
		}
		Repo(count,repo_name,repo_description,language);
		}
		
		document.getElementById("loadCont").style="display:none";
	})
	.catch((err)=>{console.log(err)});
		}
	}
})
var left=()=>{
	document.getElementById("loadCont").style="display:flex";
	var stat="left";
	fet(stat);
}
var right=()=>{
	document.getElementById("loadCont").style="display:flex";
	var stat="right";
	fet(stat);
}
var old=()=>{
	document.getElementById("loadCont").style="display:flex";
	var stat="old";
	fet(stat);
}
var newe=()=>{
	document.getElementById("loadCont").style="display:flex";
	var stat="newe";
	fet(stat);
}
var pg=(a)=>{
	document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
	page=a;
	document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
	var parent=document.getElementById("repo-section");
	parent.innerHTML='';
		document.getElementById("loadCont").style="display:flex";
	var stat="pg";
	fet(stat);
}
var fet=(stat)=>{
	var repo_name=[];
	var repo_description=[];
	var language=[];

	var count=0;
	var parent=document.getElementById("repo-section");
	var per_page=10;
	var total_page=Math.ceil(total_repo/10);
	
	var l=document.getElementById("left");
	if(stat==null){
		for(var i=total_page;i>=1;i--){
		
		var pag=document.createElement('div');
		pag.setAttribute('class','inner');
		pag.setAttribute('id','p'+i);
		pag.setAttribute('onclick','pg('+i+')');
		pag.textContent=i;
		l.insertAdjacentElement("afterend",pag);

	}
	}
	
	document.getElementById('p'+page).style="background-color: #428BCA;color:white;"
	if(stat=="right"){
	
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		if(page<total_page){
			page++;
		}
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
	}
	else if(stat=="left"){
	
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		if(page>1){
			page--;
		}
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
	}
	else if(stat=="old"){
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		page=1;
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
		document.getElementById('old').style="color:#428BCA;";
		document.getElementById('newe').style="color:#989898;";

	}
	else if(stat=="newe"){
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		page=total_page;
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
		document.getElementById('newe').style="color:#428BCA;";
		document.getElementById('old').style="color:#989898;";
	}
	fetch('https://api.github.com/users/MohamedTawfeeq25/repos?per_page='+per_page+'&page='+page+'&sort=created&direction=asc')
	.then(res=>res.json())
	.then(res=>{count=res.length;
		console.log(res);
		for(var i=0;i<res.length;i++){
			repo_name.push(res[i].name);
			repo_description.push(res[i].description);
			
			language.push(res[i].language);
		}
		Repo(count,repo_name,repo_description,language);
		document.getElementById("loadCont").style="display:none";
	})
	.catch((err)=>{console.log(err)});
	console.log(page);
	

}

var Repo=(count,repo_name,repo_description,language)=>{

var parent=document.getElementById("repo-section");
	var rep=[];
		for(var i=0;i<count;i++){
		//main repo div 
		var repo=document.createElement("div");
		repo.setAttribute('class','repo');
			repo.setAttribute('id',repo_name[i]);
		
			//reponame div
			var repoName=document.createElement("div");
			repoName.setAttribute('id','repo-name');
				var p=document.createElement("p");
				p.textContent=repo_name[i];
			repoName.appendChild(p);
		
			//repo description
			var desc=document.createElement("div");
			desc.setAttribute('id','description');
				var p1=document.createElement("p");
				p1.textContent=repo_description[i];
			desc.appendChild(p1);
			
			//repo language
			if(language[i]!=null){
				var lang=document.createElement("div");
			lang.setAttribute('id','language');
				var la=document.createElement('div');
				la.textContent=language[i];
			lang.appendChild(la);
			}
		//appending to main repo
		repo.appendChild(repoName);
		repo.appendChild(desc);
		if(language[i]!=null){
			repo.appendChild(lang);
		}
		parent.appendChild(repo);
	//appending to parent

		}
		
		
		

}

profile(fet);
