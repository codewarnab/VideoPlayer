import React from 'react'

const statsData = [
  { value: '4.5', label: '90k+ reviews' },
  { value: '1M', label: 'Enrollments' },
  { value: '2M', label: 'Learners' },
  { value: '1k+', label: 'Popular Courses' }
];

const Stats = () => {
  return (
    <div className='flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16 lg:gap-20 text-black p-4'>
      {statsData.map((stat, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col items-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold'>{stat.value}</h1>
            <span className='text-xs sm:text-sm font-normal text-center'>{stat.label}</span>
          </div>
          {index < statsData.length - 1 && (
            <div className="hidden md:block w-[2px] sm:w-[3px] md:w-[4px] h-[30px] sm:h-[35px] md:h-[40px] bg-yellow-300 rotate-180"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stats;