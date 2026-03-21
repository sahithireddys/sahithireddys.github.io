import React from "react";

export default function Footer({ profile }) {
  return (
    <footer className="mx-auto w-full max-w-7xl px-6 py-10 text-center text-sm text-slate-500">
      Designed and built by Sahithi Reddy Senagapally · {profile.email}
    </footer>
  );
}