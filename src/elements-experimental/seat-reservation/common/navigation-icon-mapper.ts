/**
 * Map Object from OSDM Code to SVG icon name represented in svg-icon
 * component regarding the namespace "fpl".
 */
// TODO ggf. erweitern um aria-label Description?

export const mapNavigationIconToSvg: Record<string, string> = {
  BICYCLE: 'sa-vo',
  BICYCLE_LOW: 'sa-vo',
  BICYCLE_HIGH: 'sa-vo',
  BUSINESS: 'sa-bz',
  BUSINESS_COMFORT: 'sa-bz',
  FAMILY: 'sa-fa',
  PRAM: 'sa-abteilkinderwagen',
  RESTAURANT: 'sa-wr',
  SILENCE: 'sa-rz',
  WHEELCHAIR: 'sa-rs',
  WHEELCHAIR_AND_SEAT: 'sa-rs',
  WHEELCHAIR_NO_SEAT: 'sa-rs',
};

/**
BISTRO	Y	Y	Y	Places in a coach with self-service bistro	COMPARTMENT_TYPE
CABIN8	Y	Y	Y	Special place group in TGV	COMPARTMENT_TYPE
CAR_LARGE	Y	N	Y	Vehicle parking place category 6-8	SPECIAL_COMPARTMENT_TYPE
CAR_SMALL	Y	N	Y	Vehicle parking place category 1-3	SPECIAL_COMPARTMENT_TYPE
CARRE	Y	Y	Y	Carré (4 seats facing normally 2nd Class)	COMPARTMENT_TYPE
CHILDREN_AREA	Y	Y	Y	Places in children area	PLACE_OR_COMPARTMENT_POSITION
CLUB	Y	N	Y	Club Category (RENFE)	COMPARTMENT_TYPE
CLUB_2	Y	Y	Y	Club Duo (2 seats facing in a separate compartment)	COMPARTMENT_TYPE
CLUB_4	Y	Y	Y	Club 4 (4 seats facing)	COMPARTMENT_TYPE
COMPARTMENT	Y	Y	Y	Places in a compartment	COMPARTMENT_TYPE
COUCHETTE_2	Y	N	Y	Two person couchette cabin	COMPARTMENT_TYPE
COUCHETTE_4	Y	N	Y	Couchette Four-berth	COMPARTMENT_TYPE
COUCHETTE_5	Y	N	Y	Couchette Five-berth	COMPARTMENT_TYPE
COUCHETTE_6	Y	N	Y	Couchette Six-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_4	Y	N	Y	Couchette higher quality Four-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_5	Y	N	Y	Couchette higher quality Five-berth	COMPARTMENT_TYPE
COUCHETTE_COMFORT_6	Y	N	Y	Couchette higher quality Six-berth	COMPARTMENT_TYPE
COUCHETTE_PRM_2	Y	N	Y	Couchette suitable for PRMs Two-berth	SPECIAL_COMPARTMENT_TYPE
COUCHETTE_PRM_3	Y	N	Y	Couchette suitable for PRMs Three-berth	SPECIAL_COMPARTMENT_TYPE
COUCHETTE_PRM_4	Y	N	Y	Couchette suitable for PRMs Four-berth	SPECIAL_COMPARTMENT_TYPE
DOUBLE	Y	N	Y	Two person sleeper compartment	COMPARTMENT_TYPE
DOUBLE_WC	Y	N	Y	Two person sleeper compartment with WC	COMPARTMENT_TYPE
DOUBLE_SWC	Y	N	Y	Double sleeper compartment with shower & WC	COMPARTMENT_TYPE
DOUBLE_SWC_DB	Y	N	Y	Double sleeper compartment with shower & WC & double bed	COMPARTMENT_TYPE
DOUBLE_S	Y	N	Y	Double sleeper compartment with shower	COMPARTMENT_TYPE
EASY_ACCESS	Y	Y	Y	Place with easy access for PRMs	PLACE_OR_COMPARTMENT_POSITION
EXCELLENCE	Y	Y	Y	Special Excellence Places (RhB)	COMPARTMENT_TYPE
FRONT_VIEW	Y	Y	Y	Seat with front-view	PLACE_OR_COMPARTMENT_POSITION
HISTORIC_COACH	Y	Y	Y	Seat in historic coach	COMPARTMENT_TYPE
KIOSQUE	Y	Y	Y	Kiosque (special seats in edge area of a TGV)	COMPARTMENT_TYPE
MINI_SUITE	Y	N	Y	Mini Suite - single person couchette compartment (Capsule)	COMPARTMENT_TYPE
MOTOR_CYCLE	Y	N	Y	Motorcycle	SPECIAL_COMPARTMENT_TYPE
MOTOR_CYCLE_SC	Y	N	Y	Motorcycle with sidecar	SPECIAL_COMPARTMENT_TYPE
OPEN_SPACE	Y	Y	Y	Places in open space area	COMPARTMENT_TYPE
PANORAMA	Y	Y	Y	Places in a panorama coach	COMPARTMENT_TYPE
PRAM_WITH_SEAT	Y	N	Y	Seat with space for a pram	SPECIAL_COMPARTMENT_TYPE
PREMIUM	Y	Y	Y	Seat with premium comfort (higher than first class)	SPECIAL_COMPARTMENT_TYPE
SALON	Y	Y	Y	Salon (6 seats facing in a separate compartment)	COMPARTMENT_TYPE
SINGLE	Y	N	Y	Single sleeper compartment	COMPARTMENT_TYPE
SINGLE_WC	Y	N	Y	Single sleeper compartment with WC	COMPARTMENT_TYPE
SINGLE_SWC	Y	N	Y	Single sleeper compartment with shower & WC	COMPARTMENT_TYPE
SINGLE_SWC_DOUBLE	Y	N	Y	Single compartment with shower & WC & double bed	COMPARTMENT_TYPE
SLEEPERETTE	Y	N	Y	Sleeperette (reclining seat)	COMPARTMENT_TYPE
SLEEPER_DELUXE	Y	N	Y	Berth deluxe	COMPARTMENT_TYPE
SOLO	Y	Y	Y	Separate place without neighbor seat	COMPARTMENT_TYPE
SOLO_COM	Y	Y	Y	Special separate place without neighbor seat (e.g. in TGV)	COMPARTMENT_TYPE
SPECIAL_SLEEPER	Y	N	Y	Special Sleeper Compartment, one Person sleeper compartment smaller than a Single	COMPARTMENT_TYPE
TANDEM	Y	Y	Y	Tandem Bicycle	SPECIAL_COMPARTMENT_TYPE
TOURIST_SLEEPER_2	Y	N	Y	T2 sleeper compartment	COMPARTMENT_TYPE
TOURIST_SLEEPER_3	Y	N	Y	T3 sleeper compartment	COMPARTMENT_TYPE
TOURIST_SLEEPER_3_WC	Y	N	Y	T3 sleeper compartment with WC	COMPARTMENT_TYPE
TOURIST_SLEEPER_3_SWC	Y	N	Y	T3 sleeper compartment with shower & WC	COMPARTMENT_TYPE
TOURIST_SLEEPER_4	Y	N	Y	T4 sleeper compartment	COMPARTMENT_TYPE
WITH_ANIMALS	Y	Y	Y	Place with animals (animals allowed)	SPECIAL_COMPARTMENT_TYPE
WITH_SMALL_CHILDREN	Y	Y	Y	Place for passengers with small children	PLACE_OR_COMPARTMENT_POSITION
WITHOUT_ANIMALS	Y	Y	Y	Place in an area where animals are not allowed	SPECIAL_COMPARTMENT_TYPE
 */
