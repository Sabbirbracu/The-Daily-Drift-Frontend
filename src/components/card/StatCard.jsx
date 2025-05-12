import { FileText, MessageCircle, Users, UserX } from 'lucide-react'; // Import icons
import React from 'react';

const StatCard = ({ title, value, icon, bgColor = "bg-white", textColor = "text-black" }) => {
  let Icon;
  switch (icon) {
    case "users":
      Icon = Users;
      break;
    case "file-text":
      Icon = FileText;
      break;
    case "message-circle":
      Icon = MessageCircle;
      break;
    case "user-x":
      Icon = UserX;
      break;
    default:
      Icon = Users; 
  }

  return (
    <div className={`p-6 rounded-xl shadow-lg ${bgColor}`}>
      <div className={`flex items-center ${textColor}`}>
        <Icon className="w-6 h-6 mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
