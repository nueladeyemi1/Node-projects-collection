// #include <iostream>
// #include <cmath>

// using namespace std; 

// // Anaerobic digester model
// const double dung_input = 5; // kg/day
// const double biogas_yield = 0.03; // m3/kg

// // Self-heating and ignition
// const double biogas_energy = 28000; // kJ/m3
// const double energy_need = 16589; // kJ 

// // HTC reactor model
// const double biomass_input = 1; // kg/hr
// const double steam_input = 6.8; // kg/hr
// const double R1 = 0.6; // Biomass -> CO
// const double R2 = 0.3; // Biomass -> H2
// const double R3 = 0.05; // Biomass -> CH4
// const double R4 = 0.05; // Biomass -> Biochar

// int main() {

//   // Digester
//   double biogas_flow = dung_input * biogas_yield;  
//   cout << "Biogas flow rate: " << biogas_flow << " m3/day" << endl;

//   // Ignition
//   double ignition_time = energy_need / (biogas_flow * biogas_energy);
//   cout << "Self-ignition after: " << ignition_time << " days" << endl;

//   // HTC reactor
//   double CO_yield = R1 * biomass_input; 
//   double H2_yield = R2 * biomass_input;
//   double CH4_yield = R3 * biomass_input;
//   double biochar_yield = R4 * biomass_input;

//   cout << "Syngas: " << CO_yield + H2_yield + CH4_yield << " kg/hr" << endl;
//   cout << "Biochar: " << biochar_yield << " kg/hr" << endl;

//   return 0;
// }