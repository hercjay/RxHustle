import React from 'react'

const Home = () => {

    let places = [
        'Abule Egba',
        'Abule-Egba',
        'Abule-Oja',
        'Agege',
        'Agidingbi',
        'Aguda',
        'Agungi',
        'Ajah',
        'Ajao Estate',
        'Ajegunle',
        'Akerele',
        'Akoka',
        'Akowonjo',
        'Alagbado',
        'Alakuko',
        'Alapere',
        'Alausa',
        'Alimosho',
        'Amuwo-Odofin',
        'Anthony Village',
        'Apapa',
        'Awolowo Road',
        'Badagry',
        'Bariga',
        'Bourdillon',
        'Coker',
        'Dolphin Estate',
        'Dopemu',
        'Dopemu-Agege',
        'Ebutte Metta',
        'Egbeda',
        'Egbeda-Idimu',
        'Egba',
        'Ejigbo',
        'Ekoro',
        'Epe',
        'Fadeyi',
        'Festac Town',
        'Gbagada',
        'Gboko',
        'Iba',
        'Ibeju-Lekki',
        'Idimu',
        'Igando',
        'Igbo Efon',
        'Igbobi College',
        'Igbogbo',
        'Ikeja',
        'Ikeja Gra',
        'Ikorodu',
        'Ikosi Ketu',
        'Ikota',
        'Ikotun',
        'Ikoyi',
        'Ilasamaja',
        'Ilashe',
        'Ilupeju',
        'Ipaja',
        'Ipakodo',
        'Iponri',
        'Irawo',
        'Isolo',
        'Jibowu',
        'Ketu',
        'Kosofe',
        'Kuramo Beach',
        'Lagos Island',
        'Lagos Mainland',
        'Lakowe',
        'Lekki',
        'Lekki Phase 1',
        'Lekki Phase 2',
        'Lekki Peninsula',
        'Magodo',
        'Makoko',
        'Marina',
        'Maryland',
        'Mende',
        'Mile 12',
        'Mushin',
        'Obalende',
        'Obanikoro',
        'Ogba',
        'Ogudu',
        'Ojodu',
        'Ojota',
        'Ojuelegba',
        'Ojota',
        'Okokomaiko',
        'Okota',
        'Ologolo',
        'Onike',
        'Oniru',
        'Oniru Estate',
        'Opebi',
        'Oregun',
        'Orile',
        'Oshodi',
        'Oworonshoki',
        'Palmgrove',
        'Palmgrove Estate',
        'Sabo',
        'Satellite Town',
        'Shomolu',
        'Surulere',
        'Takwa Bay',
        'Tejuosho',
        'Victoria Garden City',
        'Victoria Island',
        'Yaba',
        'Yaba College Of Technology'
    ];
    
    

    return (
        <div className='bg-slate-100'>
            
            <h2 className="font-bold p-2 text-4xl text-teal-700 text-center pt-10">
                The perfect place for you to find or post shifts!
            </h2>

            <div className='md:px-20 px-5 my-10'>
                <div className='bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
                    
                        <select className='mb-4 md:mb-0 md:mr-2 p-2 rounded border border-gray-300 w-100'>
                            {/* Dropdown options for date */}
                        </select>
                        <select className='w-full mb-4 md:mb-0 p-2 rounded border border-gray-300'>
                            {places.map((place, index)=>(
                                <option key={index} value={place}>{place}</option>
                            ))}
                        </select>
                        <button className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded'>
                            Find Shift!
                        </button>
                    
                    
                </div>
            </div>

        </div>
    )
}

export default Home