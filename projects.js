//constants
const backdrop = document.getElementById('overlay')
const modal = document.getElementById('mod')
const count = document.getElementById('counter')
const project_grid = document.getElementById("projects_grid")

//make global variables
var pages = {
  "1": []
}
var p = "1"

//current page
var c_page = "1"

//log of all filters
var filter_log = {
    dev: "",
    type: "",
    year: "",
    cont: ""
}

//load up all projects when loading window
window.onload = all_projects()

function all_projects(){
  //reset variables  
  pages = {
    "1": []
  }
  p = "1"
  c_page = "1"

  var used = [] //used projects in pages

  for (const [key, project] of Object.entries(data)){ //loop through each project
    if ( (pages[p].length < 7) && (!used.includes(project.name))){
      pages[p].push(project)
      used.push(project.name)
      if (pages[p].length == 6){
        p = parseInt(p) +1
        pages[p] = []
      }
    }
  }

  count.innerHTML = "Page " + c_page + " | " + p
  disp_projects(pages["1"])
}

function disp_modal(info){
  backdrop.style.display = "flex"
 // document.body.style.overflowY = 'hidden'

  //retrieve info 

  console.log(info)

  nam = info 
  sum = data[info].modal.summary
  less = data[info].modal.lesson
  git = data[info].modal.github
  dat = data[info].modal.date
  vid = data[info].modal.video

  document.getElementsByTagName('h4')[1].innerHTML = nam
  document.getElementsByTagName('a')[0].href = git
  document.getElementsByTagName('p')[0].innerHTML = dat
  document.getElementsByTagName('p')[1].innerHTML = sum
  document.getElementsByTagName('p')[2].innerHTML = less
  document.getElementsByTagName("iframe")[0].src = vid
}

var stopAllYouTubeVideos = () => { 
  var iframes = document.querySelectorAll('iframe');
  Array.prototype.forEach.call(iframes, iframe => { 
    iframe.src = iframe.src
 });
}

document.addEventListener("click", function(e){
  if (backdrop.style.display == "flex"){
    if ((e.target.id == "close") || (e.target.id == "overlay")){
      backdrop.style.display = "none"
     // document.body.style.overflowY = 'visible'
      stopAllYouTubeVideos()
    }
  }
})

function update_filter(id, checked){
  //reset
  pages = {
    "1": []
  }
  c_page = "1"
  p = "1"
  project_grid.innerHTML = ''

  // split into filter and type 
  id = id.split('-')
  filt = id[0]
  type = id[1]

  if (checked){
    //remove other type in same category
    if (filter_log[filt] != ""){
      document.getElementById(filt+"-"+filter_log[filt]).checked = false
    }
    // add filter item
    filter_log[filt] = type
  } else {
    //remove filter item
    filter_log[filt] = ""
  }

  //if there are no filters set show all projects
  if ((filter_log.dev == "") && (filter_log.type == "")  && (filter_log.year == "") && (filter_log.cont == "")) {
    all_projects()
  } else {
  //get new projects with updated filter log
    get_projects()
  }
}

function get_projects(){
  project_grid.innerHTML = ''

  //track projects added to page so they are not repeated 
  var used = [] //used projects in pages
  var unused = [] //projects that cannot be used 

  for (const [key, project] of Object.entries(data)){ //loop through each project
    for (type of Object.values(filter_log)) { //loop through the filter log to compare to the projects
      //get list of all filters on project
      if (type != ""){
        if ( (!Object.values(project.filter).includes(type)) && (!unused.includes(project.name)) ){
          unused.push(project.name)
        } 
      }
    }

    // add te project to the page 
    if ( (pages[p].length < 7) && (!used.includes(project.name)) && ((!unused.includes(project.name))) ){
      pages[p].push(project)
      used.push(project.name)
      if (pages[p].length == 6){
        p = parseInt(p) +1
        pages[p] = []
      }
    }
  }

  //solve a bug
  for ( const [key, val] of Object.entries(pages)){
    if (val.length == 0){
      delete(pages[key])
      p -=1
    }
  }

  count.innerHTML = "Page " + c_page + " | " + p
  disp_projects(pages["1"])
}


function disp_projects(page){
  project_grid.innerHTML = ''

  var timer = 0;

  for (project of page){
    //create project div
    const proj = document.createElement('div')
    proj.classList.add("project_display")
    //proj.classList.add("fade")
    proj.setAttribute("id", project.name)

    //set background image
    proj.style.backgroundImage = project.image

    //set title
    var node = document.createElement("h4");
    node.className = "modal-title"
    node.innerHTML = project.name;
    node.style.fontSize = "20px"
    proj.appendChild(node);

    //set link
    var link = document.createElement("span")
    link.className = "	fas fa-link modal-link"
    link.style.fontSize = "20px"

    //add button to link
    link.addEventListener("click", function(e){
      disp_modal(proj.id)    
    }, false)

    proj.appendChild(link)

    //add black overlay
    var overlay = document.createElement('div')
    overlay.className = "project_overlay"
    proj.appendChild(overlay)


    //add fade effect
    proj.style.transitionDuration = timer;

    //add to parent grid
    project_grid.appendChild(proj)
  }
}

//go forward a page
function forward_p(){
  //if not exceeding limit
  if (!(parseInt(c_page)+ 1 > p)){
    //go forward a page
    c_page = parseInt(c_page) + 1
    disp_projects(pages[c_page])
    count.innerHTML = "Page " + c_page + " | " + p
  } 
}

//go backward a page
function backward_p(){
  //not exceeding limit
  if (!(parseInt(c_page)- 1 < 1)){
    // go back a page
    c_page = parseInt(c_page) - 1
    disp_projects(pages[c_page])
    count.innerHTML = "Page " + c_page + " | " + p
  } 
}