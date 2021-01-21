import React from 'react'

const AddContactModal = () => {

    const handleAddContact = (e)=>{
        e.preventDefault();
        console.log(e);
    }

    return (
        <div className="bg-gray-200 rounded-md fixed top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 shadow-2xl z-50 w-80">
            <div className="modal-header bg-blue-700 p-4 text-white rounded-t-md font-bold"><h6>Add Contact</h6></div>
            <section className="add-contact-form-section p-4">
                <form onSubmit={handleAddContact} className="flex flex-col">
                    <div className="mb-2 flex flex-col">
                        <label htmlFor="mobile-no-input">Mobile No: </label>
                        <input type="text" id="mobile-no-field" placeholder="Enter mobile no.." className="bg-transparent border-blue-500 border-b-2 focus:outline-none h-8"/>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label htmlFor="username-field">Username: </label>
                        <input type="text" id="username-field" placeholder="Enter username.." className="bg-transparent border-blue-500 border-b-2 focus:outline-none"/>
                    </div>
                    <div className="action-btns flex flex-row justify-end my-1">
                        <button className="bg-blue-500 text-white mr-2 px-2 py-1 rounded focus:outline-none">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded focus:outline-none">Add</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddContactModal;
