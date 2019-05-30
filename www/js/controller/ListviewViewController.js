/**
 * @author Maja Belmega
 */
import {mwf} from "../Main.js";
import {entities} from "../Main.js";


export default class ListviewViewController extends mwf.ViewController {

    constructor() {
        super();
        // this.resetDatabaseElement = null;
        // this.addNewItemButton = null;
        console.log("ListviewViewController()");
    }


    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        console.log("oncreate(): root is: ", this.root);
        this.addNewItemButton =
            this.root.querySelector("#addNewItem");
        this.addNewItemButton.onclick = ()=> {
           // this.addItem(new entities.MediaItem( "new" + Date.now(), "https://placeimg.com/120/150/culture"));
            this.nextView("mediaEditview");
        }
        this.switchCRUDButton = this.root.querySelector("footer .mwf-img-refresh");
        this.switchCRUDButton.onclick = () =>{
            alert("current CRUD scope: " + this.application.currentCRUDScope);
            if(this.application.currentCRUDScope == this.application.CRUDOPS.REMOTE ){
                this.application.switchCRUD(this.application.CRUDOPS.LOCAL);
                // this.application.switchCRUD("local");
            }
            else{
                this.application.switchCRUD(this.application.CRUDOPS.REMOTE);
            }
            entities.MediaItem.readAll().then(items => this.initialiseListview(items));
        }
       entities.MediaItem.readAll().then(items => this.initialiseListview(items));

        // call the superclass once creation is done
        super.oncreate();
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    // bindListItemView(viewid, itemview, item) {
    //     // TODO: implement how attributes of item shall be displayed in itemview
    //    // itemview.root.querySelector("img").src = item.src;
    //     //itemview.root.querySelector("h2").textContent = item.title;
    //     //itemview.root.getElementsByTagName("h3")[0].textContent = item.added;
    //     itemview.root.querySelector("img").src = item.src;
    //     itemview.root.querySelector("h2").textContent =
    //         item.title;
    //     itemview.root.getElementsByTagName("h3")[0].textContent =
    //         item.added;
    // }

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    //not necessary - app.html li has data-mwf-targetview="readView"!!
   //  onListItemSelected(listitem, listview) {
   //      // TODO: implement how selection of listitem shall be handled
   // alert("selected item with title " + listitem.title + "and id"+ listitem._id + "!");
   //  this.nextView("mediaReadview", {item: listitem});
   //
   //  }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    // onListItemMenuItemSelected(option, listitem, listview) {
    //     // TODO: implement how selection of option for listitem shall be handled
    // }

    /*
     * for views with dialogs
     * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
     */
    bindDialog(dialogid, dialog, item) {
        // call the supertype function
        super.bindDialog(dialogid, dialog, item);

        // TODO: implement action bindings for dialog, accessing dialog.root
    }

    /*
     * for views that initiate transitions to other views
     */
    async onReturnFromSubview(subviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
        //alert("onReturnFromSubview(): " + subviewid + ", returnValue: " + JSON.stringify(returnValue) + ", returnStatus: " + returnStatus)
        if(subviewid == "mediaReadview"){
            if(returnStatus == "deleted"&&returnValue){
                this.removeFromListview(returnValue.item._id);
            }
        }
        else if(subviewid =="mediaEditview"){
            if(returnStatus == "created"&& returnValue){
                this.addToListview(returnValue.item);
            }
        }
    }
    addItem(item){
        item.create().then(() => this.addToListview(item));
        //this.addToListview(item);
    }

    editItem(item){
        item.title += (" " + item.title);
        item.update().then(() => this.updateInListview(item._id,item));

    }

    deleteItem(item) {
        item.delete().then(() => this.removeFromListview(item._id));
    }
}

