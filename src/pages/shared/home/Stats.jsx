import React from 'react'

const statsData = [
  { value: '4.5', label: '90k+ reviews' },
  { value: '1M', label: 'Enrollments' },
  { value: '2M', label: 'Learners' },
  { value: '1k+', label: 'Popular Courses' }
];

const Stats = () => {
  return (
    <div className='flex items-center justify-center gap-20 text-black text-4xl font-extrabold'>
      {statsData.map((stat, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col items-center'>
            <h1>{stat.value}</h1>
            <span className='text-sm font-normal'>{stat.label}</span>
          </div>
          {index < statsData.length - 1 && (
            <div className="w-[4px] h-[40px] bg-yellow-300 rotate-180"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stats;
