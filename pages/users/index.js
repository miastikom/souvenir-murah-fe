import Head from "next/head";
import Link from "next/link";

const Users = () => {
  return null;
  // return (
  //   <div className="container">
  //     <div className="table-responsive">
  //       <Head>
  //         <title>Users</title>
  //         <link rel="icon" href="/img/logo.png" />
  //       </Head>

  //       <table className="table w-100">
  //         <thead>
  //           <tr>
  //             <th></th>
  //             <th>ID</th>
  //             <th>Avatar</th>
  //             <th>Name</th>
  //             <th>Email</th>
  //             <th>Admin</th>
  //             <th>Action</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {users.map((user, index) => (
  //             <tr key={user._id} style={{ cursor: "pointer" }}>
  //               <th>{index + 1}</th>
  //               <th>{user._id}</th>
  //               <th>
  //                 <img
  //                   src={user.avatar}
  //                   alt={user.avatar}
  //                   style={{
  //                     width: "30px",
  //                     height: "30px",
  //                     overflow: "hidden",
  //                     objectFit: "cover",
  //                   }}
  //                 />
  //               </th>
  //               <th>{user.name}</th>
  //               <th>{user.email}</th>
  //               <th>
  //                 {user.role === "admin" ? (
  //                   user.root ? (
  //                     <i className="fas fa-check text-success"> Root</i>
  //                   ) : (
  //                     <i className="fas fa-check text-success"></i>
  //                   )
  //                 ) : (
  //                   <i className="fas fa-times text-danger"></i>
  //                 )}
  //               </th>
  //               <th>
  //                 <Link
  //                   href={
  //                     auth.user.root && auth.user.email !== user.email
  //                       ? `/edit_user/${user._id}`
  //                       : "#!"
  //                   }
  //                 >
  //                   <span>
  //                     <i
  //                       className="fas fa-edit text-info mr-2"
  //                       title="Edit"
  //                     ></i>
  //                   </span>
  //                 </Link>

  //                 {auth.user.root && auth.user.email !== user.email ? (
  //                   <i
  //                     className="fas fa-trash-alt text-danger ml-2"
  //                     title="Remove"
  //                     data-toggle="modal"
  //                     data-target="#exampleModal"
  //                     onClick={() =>
  //                       dispatch({
  //                         type: "ADD_MODAL",
  //                         payload: [
  //                           {
  //                             data: users,
  //                             id: user._id,
  //                             title: user.name,
  //                             type: "ADD_USERS",
  //                           },
  //                         ],
  //                       })
  //                     }
  //                   ></i>
  //                 ) : (
  //                   <i
  //                     className="fas fa-trash-alt text-danger ml-2"
  //                     title="Remove"
  //                   ></i>
  //                 )}
  //               </th>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default Users;
