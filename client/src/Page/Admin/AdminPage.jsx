import React from "react";
import NavAdmin from "../../Component/NavbarAdmin";
import {Col,Row, Dropdown, DropdownButton} from "react-bootstrap"
import {useQuery} from "react-query"
import { API } from "../../Config/Api"
import Moment from "moment"


export default function Admin() {

    let { data : transaction } = useQuery("transactionCache", async () => {
        const response = await API.get("/transactions")
        return response.data.data
    })

    console.log("data transaksi :", transaction)

    return (
        <div>
            <NavAdmin />
            <div style={{backgroundColor:"black", color:"white", width:"100%", height:"1000px", padding:"30px"}}>
                <div>
                    <h2>Incoming Transaction</h2>
                    <div className="mt-5 rounded" style={{border:"solid 1px", width:"80%", margin:"auto", padding:"10px", background:"#2B2B2B"}}>
                        <Row>
                            <Col>No.</Col>
                            <Col>Users</Col>
                            <Col>Expired</Col>
                            <Col>User Status</Col>
                            <Col>Payment Status</Col>
                            <Col className="mb-3">Action</Col>
                            <hr />
                        </Row>
                    <div style={{backgroundColor:"#2B2B2B"}}>
                        {transaction?.map((data,i) => ( 
                        <Row>
                            <Col>{i + 1}</Col>
                            <Col>{data?.user.fullname}</Col>
                            <Col>{Moment(data?.due_date).format("YYYY-MM-DD")}</Col>
                            <Col>Active</Col>
                            <Col>{data?.status}</Col>
                            <Col className="mb-3">
                            <DropdownButton id="dropdown-basic-button" variant="secondary">
                                <Dropdown.Item href="#/action-1">Approve</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Cancel</Dropdown.Item>
                            </DropdownButton>
                            </Col>
                            <hr />
                        </Row>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}