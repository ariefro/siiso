export default function TrackFeature({ data, label }) {
  return (
    <div className='border py-4'>
      <h4 className='text-2xl font-bold text-center'>{data}</h4>
      <p className='capitalize text-xs text-center px-5 sm:px-16 md:px-5 lg:px-10'>
        {label}
      </p>
    </div>
  );
}
