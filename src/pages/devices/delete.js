export default function DeleteDevice(id){

    const deleteDev = async () => {
        console.log(id)
        try {
            await fetch(`http://localhost:3000/api/devices/${id}`, {
                method: "DELETE",
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = () => {
        deleteDev()
    }

    handleDelete()
}