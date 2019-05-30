/**
 * @author Jörn Kreutel
 */
import {mwf} from "../Main.js";
import {entities} from "../Main.js";

export default class ReadViewControllerTemplate extends mwf.ViewController {

    constructor() {
        super();

        console.log("ReadViewControllerTemplate()");
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // alert("this.args:" + JSON.stringify(this.args));
        // if(this.args && this.args.item){
            this.mediaItem = this.args.item;
            //view Proxy ist Stellvertreter zum Template
            this.viewProxy = this.bindElement("mediaReadviewTemplate", {item: this.mediaItem}, this.root).viewProxy;
            this.viewProxy.bindAction("deleteItem", () => this.deleteItemAndReturnToPreviousView());
            //manuelles data-binding:
    //     }
    //     else{
    //         this.mediaItem = new entities.MediaItem("my item", "https://placeimg.com/120/150/culture");
    //     }
    //     // TODO: do databinding, set listeners, initialise the view
    //
    // this.img=this.root.querySelector("main img");
    // this.h1 = this.root.getElementsByTagName("h1")[0];
    //
    // this.img.src = this.mediaItem.src + "?t=" + this.mediaItem._id;
    // this.h1.textContent = this.mediaItem.title;
    // this.deleteItemButton = this.root.querySelector("header .mwf-img-delete");
    // this.deleteItemButton.onclick = () => {
    //     alert("delete(): " + this.mediaItem.title);
    //     this.mediaItem.delete().then(this.previousView({item: this.mediaItem}, "deleted"));
    // }

        // call the superclass once creation is done
        super.oncreate();
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    bindListItemView(viewid, itemview, item) {
        // TODO: implement how attributes of item shall be displayed in itemview
        itemview.root.querySelector("h2").textContent = item.title;
        itemview.root.getElementsByTagName("h3")[0].textContent = item.added;
        itemView.root.querySelector("img").src = item.src;


    }

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemSelected(listitem, listview) {
        // TODO: implement how selection of listitem shall be handled
    }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemMenuItemSelected(option, listitem, listview) {
        // TODO: implement how selection of option for listitem shall be handled
    }

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
    }
    deleteItemAndReturnToPreviousView(){
        alert("delete(): " + this.mediaItem.title);
            this.mediaItem.delete().then(()=>this.previousView({item: this.mediaItem}, "deleted"));

}

}

