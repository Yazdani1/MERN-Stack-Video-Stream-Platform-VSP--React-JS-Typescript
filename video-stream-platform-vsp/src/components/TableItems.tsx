import {FC} from 'react'
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {VideoPostListProps} from "../DataProvider";

interface TableItemsProps {

    videoposts:VideoPostListProps;

}

const TableItems:FC<TableItemsProps> = ({videoposts}) => {
  return (
    <div>
    <div className="container-fluid main_containers">
          {/* table start */}

          <div className="table-horizontal">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Video title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Published on</th>
                  <th scope="col">Category</th>
                  <th scope="col">View</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              
                    <tr>
                      <th scope="row">{}</th>

                      <td>
                        <img
                          src={videoposts.thumbnail}
                          height="100px"
                          width="150px"
                          style={{ objectFit: "cover" }}
                        />
                      </td>

                      <td>{videoposts.title.substring(0, 30)}</td>
                      <td>{videoposts.des?.substring(0, 100)}</td>

                      <td> {moment(videoposts.date).format("MMMM Do YYYY")}</td>
                      <td>{videoposts.categoryBy?.categoryName}</td>

                      <td>
                        <button className="btn btn-primary">View</button>
                      </td>

                      <td>
                        <button className="btn btn-success">
                          <FaEdit size={20} /> Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                        //   onClick={() => deletePost(item._id)}
                        >
                          <MdDelete size={20} /> Delete
                        </button>
                      </td>
                    </tr>


             
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default TableItems