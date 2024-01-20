var page=(count,rep,repo_name,url)=>{
	var current_page=1;
	var j=0;
	var parent=document.getElementById("repo-section");
	var total=Math.ceil(count/6);
	var l=document.getElementById("left");
	for(var i=total;i>=1;i--){
		var pag=document.createElement('div');
		pag.setAttribute('class','inner');
		pag.setAttribute('id','p'+i);
		pag.textContent=i;
		l.insertAdjacentElement("afterend",pag);

	}
	document.getElementById('p'+current_page).style="background-color: #428BCA;color:white;"
	
	for(var i=1;i<=count;i++){
			parent.appendChild(rep[i]);
			if(i==6){
				j=i+1;
				break;
			}
	}
	document.getElementById('left').addEventListener('click',()=>{
		if(current_page>1){
			current_page--;
		}
		parent.innerHTML='';
			
		document.getElementById('p'+current_page).style="background-color: #428BCA;color:white;";
	})
	document.getElementById('right').addEventListener('click',()=>{
		if(current_page<total){
			current_page++;
		}
		parent.innerHTML='';
		for(var i=j;i<=count;i++){
			parent.appendChild(rep[i]);
			if(i==6*current_page){
				j=i+1;
				break;
			}
	}
		document.getElementById('p'+current_page).style="background-color: #428BCA;color:white;"
	})
}
var Repo=(count,repo_name,repo_description,language,url)=>{

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
		rep.push(repo);
	//appending to parent

		}
		
		page(count,rep,repo_name,url);
		

}
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
	var repo_name=[];
	var repo_description=[];
	var language=[];
	var url=[];var count=0;
	fetch("https://api.github.com/users/MohamedTawfeeq25/repos")
	.then(res=>res.json())
	.then(res=>{
		count=res.length;
		for(var i=0;i<res.length;i++){
			repo_name.push(res[i].name);
			repo_description.push(res[i].description);
			url.push(res[i].html_url);
			language.push(res[i].language);
		}
		
		Repo(count,repo_name,repo_description,language,url);
	})
	.catch((err)=>{console.log(err)});
}
fet();