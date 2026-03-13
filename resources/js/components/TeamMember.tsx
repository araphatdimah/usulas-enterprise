import React from 'react'

// TeamMember: small card to spotlight a team member
export default function TeamMember({ member }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
      <figure className="w-28 h-28 mb-3">
        <img
          src={member.photo || 'https://via.placeholder.com/150?text=Team'}
          alt={member.name}
          className="w-full h-full object-cover rounded-full"
          loading="lazy"
        />
      </figure>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-300">{member.role}</p>
      {member.bio && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>}
    </article>
  )
}
