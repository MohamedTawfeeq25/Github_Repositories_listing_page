
var total_repo=0;
var page=1;
var profile=(fet)=>{
	fetch("https://api.github.com/users/MohamedTawfeeq25")
	.then(res=>res.json())
	.then(res=>{
		total_repo=res.public_repos;
		document.getElementById("bio").textContent=res.bio;
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
var left=()=>{
	var stat="left";
	fet(stat);
}
var right=()=>{
	var stat="right";
	fet(stat);
}
var fet=(stat)=>{
	var repo_name=[];
	var repo_description=[];
	var language=[];
	var url=[];
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
		pag.textContent=i;
		l.insertAdjacentElement("afterend",pag);

	}
	}
	
	document.getElementById('p'+page).style="background-color: #428BCA;color:white;"
	if(stat=="right"){
		var repo_name=[];
	var repo_description=[];
	var language=[];
	var url=[];
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		if(page<total_page){
			page++;
		}
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
	}
	else if(stat=="left"){
		var repo_name=[];
	var repo_description=[];
	var language=[];
	var url=[];
		document.getElementById('p'+page).style="background-color: white;color:#428BCA;";
		if(page>1){
			page--;
		}
		document.getElementById('p'+page).style="background-color: #428BCA;color:white;";
		parent.innerHTML='';
	}
	fetch('https://api.github.com/users/MohamedTawfeeq25/repos?per_page='+per_page+'&page='+page)
	.then(res=>res.json())
	.then(res=>{count=res.length;
		console.log(res);
		for(var i=0;i<res.length;i++){
			repo_name.push(res[i].name);
			repo_description.push(res[i].description);
			url.push(res[i].html_url);
			language.push(res[i].language);
		}
		Repo(count,repo_name,repo_description,language,url);
	})
	.catch((err)=>{console.log(err)});
	console.log(page);
	

}

var Repo=(count,repo_name,repo_description,language,url)=>{

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
