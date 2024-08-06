import React from "react";

export default function ProfileInfos({ user }) {
  return (
    <div className="w-full mt-6">
      <div>
        <p className="font-semibold">{user?.firstname}</p>
        <button>Change your firstname</button>
      </div>
      <div>
        <p className="font-semibold">{user?.lastname}</p>
        <button>Change your lastname</button>
      </div>
      <div>
        <p className="font-semibold">{user?.email}</p>
        <button>Change your email</button>
      </div>
      <div>
        <p className="font-semibold">cv</p>
        <button>Change your cv</button>
      </div>
    </div>
  );
}
