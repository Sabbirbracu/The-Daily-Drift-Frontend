import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';

import Modal from "../components/modal";
import Table from "../components/table";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';

import Modal from "../components/modal";
import Table from "../components/table";

import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useSuspendUserMutation,
  useUnsuspendUserMutation,
} from "../features/users/userApi";

import { triggerDashboardRefetch } from '../features/dashboard/dashboardSlice';

import { triggerDashboardRefetch } from '../features/dashboard/dashboardSlice';

const ManageUser = () => {
  const dispatch = useDispatch();
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();

  const dispatch = useDispatch();
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();

  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [unsuspendUser] = useUnsuspendUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) {
    console.error("Error fetching users:", error);
    return <div className="p-6 text-red-600">Error loading users</div>;
    console.error("Error fetching users:", error);
    return <div className="p-6 text-red-600">Error loading users</div>;
  }

  const transformedUsers = users?.map((u) => ({
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    admin: u.role === "admin",
    suspended: u.suspended,
  }));

  const handleToggle = async (field, userId, currentValue) => {
    const user = users.find((u) => u._id === userId);
    const username = user?.name || "User";

    if (field === "admin") {
      const willBeAdmin = !currentValue;
      setModalMessage(
        `Are you sure you want to ${willBeAdmin ? "make admin" : "remove admin role from"} ${username}?`
      );
      setCurrentAction(() => async () => {
        if (willBeAdmin) {
          await makeAdmin(userId).unwrap();
          toast.success(`${username} is now an admin!`);
        } else {
          await removeAdmin(userId).unwrap();
          toast.success(`Removed admin role from ${username}`);
        }
        dispatch(triggerDashboardRefetch()); // Trigger dashboard refetch
        await refetch();
      });
    } else if (field === "suspended") {
      const willBeSuspended = !currentValue;
      setModalMessage(
        `Are you sure you want to ${willBeSuspended ? "suspend" : "unsuspend"} ${username}?`
      );
      setCurrentAction(() => async () => {
        if (willBeSuspended) {
          await suspendUser(userId).unwrap();
          toast.success(`${username} has been suspended.`);
        } else {
          await unsuspendUser(userId).unwrap();
          toast.success(`${username} has been unsuspended.`);
        }
        dispatch(triggerDashboardRefetch()); // Trigger dashboard refetch
        await refetch();
      });
    }

    setCurrentUserId(userId);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (currentAction) {
      await currentAction();
      setIsModalOpen(false);
  const transformedUsers = users?.map((u) => ({
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    admin: u.role === "admin",
    suspended: u.suspended,
  }));

  const handleToggle = async (field, userId, currentValue) => {
    const user = users.find((u) => u._id === userId);
    const username = user?.name || "User";

    if (field === "admin") {
      const willBeAdmin = !currentValue;
      setModalMessage(
        `Are you sure you want to ${willBeAdmin ? "make admin" : "remove admin role from"} ${username}?`
      );
      setCurrentAction(() => async () => {
        if (willBeAdmin) {
          await makeAdmin(userId).unwrap();
          toast.success(`${username} is now an admin!`);
        } else {
          await removeAdmin(userId).unwrap();
          toast.success(`Removed admin role from ${username}`);
        }
        dispatch(triggerDashboardRefetch()); // Trigger dashboard refetch
        await refetch();
      });
    } else if (field === "suspended") {
      const willBeSuspended = !currentValue;
      setModalMessage(
        `Are you sure you want to ${willBeSuspended ? "suspend" : "unsuspend"} ${username}?`
      );
      setCurrentAction(() => async () => {
        if (willBeSuspended) {
          await suspendUser(userId).unwrap();
          toast.success(`${username} has been suspended.`);
        } else {
          await unsuspendUser(userId).unwrap();
          toast.success(`${username} has been unsuspended.`);
        }
        dispatch(triggerDashboardRefetch()); // Trigger dashboard refetch
        await refetch();
      });
    }

    setCurrentUserId(userId);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (currentAction) {
      await currentAction();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">Manage Users</h2>
      <Table
        columns={["Name", "Email", "Role", "Admin", "Suspended"]}
        data={transformedUsers}
        toggleFields={["admin", "suspended"]}
        onToggle={handleToggle}
      />

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
        textColor="text-blue-600"
      />
    </div>
  );
};

export default ManageUser;
