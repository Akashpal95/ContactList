


eventSetter();


function eventSetter(){
    var listItems = document.getElementsByClassName('list-item');
    // console.log(listItems);
    for(let each of listItems){
        each.addEventListener('mouseover', function(){
            // console.log(each);
            each.children[3].children[0].style.visibility="initial";
        })
        each.addEventListener('mouseleave', function(){
            // console.log(each.children[3].style.visibility);
            each.children[3].children[0].style.visibility="hidden";
        })
        // each.children[3].addEventListener('click', function(){
        //     let parentUL = each.parentElement.parentElement;
        //     let parentLi = each.parentElement;
        //     parentLi.children[0].classList.add('deleted');
        //     // parentLi.parentNode.removeChild(parentLi);
        // });
    }

}