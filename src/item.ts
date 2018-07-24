// item.ts

class Item {

    name: String = "Default Item"

    /**
     * An `Entity` uses this `Item` on some `other` thing.
     * Can be a `Block`, the `Entity` itself, or another `Entity`.
     */
    on_use: Function = (entity: any, other?: any) => {

        console.log("Default item used by ")
        console.log(entity)

        if (other) {
            console.log(" on ")
            console.log(other)
        }
    }
}