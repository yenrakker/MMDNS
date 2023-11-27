import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { countries } from 'countries-list'
import MetaData from '../Layout/Metadata'
import CheckoutSteps from './CheckoutSteps'

const Event = ({ event, saveEventInfo }) => {

    const countriesList = Object.values(countries)
    const [address, setAddress] = useState(event?.address || '')
    const [city, setCity] = useState(event?.address || '')
    const [postalCode, setPostalCode] = useState(event?.address || '')
    const [phoneNo, setPhoneNo] = useState(event?.address || '')
    const [country, setCountry] = useState(event?.address || '')
    let navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()

        saveEventInfo({ address, city, phoneNo, postalCode, country })
        navigate('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'Event Info'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={submitHandler}
                        style={{border:"solid 3px white"}}
                    >
                        <h1 className="mb-4">Event Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="loginbuts"
                            type="submit"
                            className="buttonforLogin"
                            style={{border:"solid 3px white"}}
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Event