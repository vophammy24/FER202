export function Form() {
    return (
        <div className="container pb-5">
            <form className="row g-3 needs-validation" novalidate>
                <h2 className="text-white text-center">Book Your Table</h2>
                <div className="col-md-4">
                    <input type="text" class="form-control" placeholder="Your Name *" required/>
                </div>
                <div className="col-md-4">
                    <input type="text" class="form-control" placeholder="Your Email *" required/>
                </div>
                <div className="col-md-4">
                    <select className="form-select" required>
                    <option selected disabled value="">Select a Service</option>
                    <option>Table for Couple</option>
                    <option>Table for Family</option>
                    </select>
                </div>
                <div>
                    <textarea className="form-control" id="validationTextarea" placeholder="Please write your comment" required></textarea>
                </div>
                <div className="col-12">
                    <button className="btn btn-warning" type="submit">Send Message</button>
                </div>
        </form>
    </div>
    )
}