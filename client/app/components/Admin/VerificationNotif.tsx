import React from 'react';
import { useGetUserInformationQuery } from '../../../redux/features/user/userApi';
import { useUpdateUserRoleByIdMutation } from '../../../redux/features/user/userApi';
import Image from 'next/image'; // Adjust the import based on your framework
import avatarIcon from '../../../public/assests/avatar.png'; // Adjust the path as necessary
import { toast } from 'react-hot-toast';

type VerificationNotifProps = {
 show: boolean;
 onClose: () => void;
 userId: string;
};

const VerificationNotif: React.FC<VerificationNotifProps> = ({ show, onClose, userId }) => {
 const { data: user, isLoading } = useGetUserInformationQuery(userId);
 const [updateUserRole, { isLoading: isUpdating, isError, error }] = useUpdateUserRoleByIdMutation();

 if (!show || isLoading) return null;

 const handleApprove = async () => {
    try {
      await updateUserRole({ userId, role: 'teacher' });
      // Handle success, e.g., show a success message or close the modal
      toast.success("Role is updated to Teacher");
      onClose();
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Failed to update user role:', error);
    }
 };

 return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Translucent overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg relative z-50">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-center mb-4">Verification Notification</h1>
        <div className="w-full flex justify-center">
          <div className="relative">
            <Image
              src={user?.data?.avatar || avatarIcon}
              alt="User Avatar"
              width={120}
              height={120}
              className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 space-y-2 text-center">
          <p className="text-lg font-semibold text-gray-700">User ID: {userId}</p>
          <p className="text-lg font-semibold text-gray-700">Name: {user?.data?.name}</p>
          <p className="text-lg font-semibold text-gray-700">Email: {user?.data?.email}</p>
          <p className="text-lg font-semibold text-gray-700">Phone Number: {user?.data?.phoneNumber}</p>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-lg font-semibold text-gray-700 mb-4">Approve Teacher Role</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleApprove} disabled={isUpdating}>
            Approve
          </button>
        </div>
      </div>
    </div>
 );
};

export default VerificationNotif;
