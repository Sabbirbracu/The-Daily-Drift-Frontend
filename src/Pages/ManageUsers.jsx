import React from "react";
import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
} from "../features/users/userApi";

const ManageUser = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [unsuspendUser] = useUnsuspendUserMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  const handleAdminToggle = async (userId, isAdmin) => {
    try {
      if (isAdmin) {
        await makeAdmin(userId).unwrap();
      } else {
        await removeAdmin(userId).unwrap();
      }
    } catch (err) {
      console.error("Failed to update admin role:", err);
    }
  };

  const handleSuspendToggle = async (userId, isSuspended) => {
    try {
      if (isSuspended) {
        await suspendUser(userId).unwrap();
      } else {
        await unsuspendUser(userId).unwrap();
      }
    } catch (err) {
      console.error("Failed to update suspension:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Admin</th>
            <th className="border px-4 py-2 text-left">Suspend</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.role === "admin"}
                    onChange={() => handleAdminToggle(user.id, user.role !== "admin")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-500">
                    <span className="w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5" />
                  </div>
                </label>
              </td>
              <td className="border px-4 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.suspended}
                    onChange={() => handleSuspendToggle(user.id, !user.suspended)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-500">
                    <span className="w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5" />
                  </div>
                </label>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => console.log(`Edit user with ID: ${user.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
