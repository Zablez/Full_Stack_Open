import Country from './Country';

const Filtered = (props) => {
  const { filteredCountries } = props;

  if (filteredCountries.length === 1) {
    return <Country filteredCountries={filteredCountries[0]} />;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length < 10) {
    return (
      <>
        {filteredCountries.map((item) => (
          <div key={item.area}>{item.name.common}</div>
        ))}
      </>
    );
  }
};

export default Filtered;
