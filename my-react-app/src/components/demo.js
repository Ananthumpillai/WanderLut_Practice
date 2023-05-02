import React from 'react';
import { Fieldset } from 'primereact/fieldset';

export default function ToggleableDemo() {
    return (
        <div className="container-fluid">
            <div className="row mt-5 mb-5">
                <div className="col-md-6 offset-1 ">
                    <Fieldset style={{ width: '90%', marginTop: '20px' }} legend='Overview' className='p-fieldset' collapsed={true} toggleable={true} >
                    aaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </Fieldset>
                    <Fieldset style={{ width: '90%', marginTop: '20px' }} legend='Package Inclusions' collapsed={true} toggleable={true} >

                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </Fieldset>
                    <Fieldset  style={{ width: '90%', marginTop: '20px' }}legend='Itinerary' collapsed={true} toggleable={true} >
                       qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                    </Fieldset>

                    <br />
                </div>
            </div>
        </div>
    )
}