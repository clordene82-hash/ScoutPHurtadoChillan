import React, { useState } from 'react';
import { 
  Users, Calendar, Award, DollarSign, Plus, Check, X, 
  Search, Shield, Heart, AlertCircle, ChevronRight
} from 'lucide-react';

// INSIGNIA OFICIAL EN SVG
const ScoutBadge = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="250" r="240" fill="#DA1E28" stroke="#FFFFFF" strokeWidth="12" />
    <circle cx="250" cy="250" r="225" fill="#DA1E28" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 6" />
    <circle cx="250" cy="250" r="220" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <g transform="translate(0, 5)">
      <path d="M 180,240 C 130,200 130,130 190,140 C 230,150 245,200 250,225 C 255,200 270,150 310,140 C 370,130 370,200 320,240 C 270,280 250,300 250,325 C 250,300 230,280 180,240 Z" fill="#F1C40F" stroke="#B7950B" strokeWidth="3"/>
      <path d="M 250,90 C 275,150 300,180 320,220 C 290,220 270,200 250,230 C 230,200 210,220 180,220 C 200,180 225,150 250,90 Z" fill="#0D47A1" stroke="#FFFFFF" strokeWidth="3"/>
      <line x1="250" y1="90" x2="250" y2="330" stroke="#FFFFFF" strokeWidth="4" />
      <polygon points="205,200 209,212 221,212 211,219 215,230 205,223 195,230 199,219 189,212 201,212" fill="#FFFFFF" />
      <polygon points="295,200 299,212 311,212 301,219 305,230 295,223 285,230 289,219 279,212 291,212" fill="#FFFFFF" />
      <rect x="210" y="270" width="80" height="10" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="4"/>
      <path d="M 210,310 C 230,340 250,350 250,350 C 250,350 270,340 290,310" fill="none" stroke="#F1C40F" strokeWidth="5" strokeLinecap="round"/>
    </g>
    <path d="M 185,415 C 210,385 240,370 250,370 C 260,370 290,385 315,415" fill="none" stroke="#FFFFFF" strokeWidth="6"/>
    <ellipse cx="230" cy="385" rx="16" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="5"/>
    <ellipse cx="270" cy="385" rx="16" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="5"/>
    <path id="textArcTop" d="M 75,250 A 175,175 0 1,1 425,250" fill="none"/>
    <text fill="#FFFFFF" fontSize="25" fontWeight="900" fontFamily="sans-serif" letterSpacing="3">
      <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
        GRUPO GUÍA SCOUT PADRE HURTADO
      </textPath>
    </text>
    <path id="textArcBottom" d="M 400,250 A 150,150 0 0,1 100,250" fill="none"/>
    <text fill="#FFFFFF" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="4">
      <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
        CHILLÁN
      </textPath>
    </text>
  </svg>
);

// ESTRUCTURA OFICIAL AGSCH
const STAGES_BY_UNIT = {
  "Bandada (Golondrinas)": ["Pichón", "Aprendiz", "Viajera", "Guía de Vuelo"],
  "Manada (Lobatos)": ["Lobezno", "Saltador", "Diestro", "Cazador"],
  "Compañía (Guías)": ["Alba", "Amanecer", "Luz", "Resplandor"],
  "Tropa (Scouts)": ["Cernícalo", "Halcón", "Águila", "Cóndor"],
  "Avanzada (Pioneros/as)": ["Bienvenida", "Sendero", "Cumbre"],
  "Clan (Caminantes)": ["Fuego", "Antorcha"]
};

// DATOS INICIALES
const INITIAL_MEMBERS = [
  { id: 1, name: "Sofía Morales", unit: "Bandada (Golondrinas)", role: "Golondrina", patrol: "Bandada Copihue", stage: "Aprendiz", feeStatus: "Al día", phone: "+56 9 1234 5678", emergency: "Mamá - +56 9 8765 4321", medical: "Alergia al polen" },
  { id: 2, name: "Mateo Silva", unit: "Manada (Lobatos)", role: "Lobato", patrol: "Seisena Gris", stage: "Saltador", feeStatus: "Al día", phone: "+56 9 2345 6789", emergency: "Papá - +56 9 7654 3210", medical: "Ninguna" },
  { id: 3, name: "Camila Rojas", unit: "Compañía (Guías)", role: "Guía", patrol: "Patrulla Araucaria", stage: "Amanecer", feeStatus: "Pendiente", phone: "+56 9 3456 7890", emergency: "Mamá - +56 9 6543 2109", medical: "Asma leve" },
  { id: 4, name: "Lucas Contreras", unit: "Tropa (Scouts)", role: "Guía de Patrulla", patrol: "Patrulla Cóndor", stage: "Águila", feeStatus: "Al día", phone: "+56 9 4567 8901", emergency: "Papá - +56 9 5432 1098", medical: "Intolerancia a la lactosa" },
  { id: 5, name: "Valentina Henríquez", unit: "Avanzada (Pioneros/as)", role: "Pionera", patrol: "Avanzada Lautaro", stage: "Sendero", feeStatus: "Al día", phone: "+56 9 5678 9012", emergency: "Mamá - +56 9 4321 0987", medical: "Ninguna" },
  { id: 6, name: "Benjamín Fuentes", unit: "Clan (Caminantes)", role: "Caminante", patrol: "Equipo Ruuka", stage: "Fuego", feeStatus: "Pendiente", phone: "+56 9 6789 0123", emergency: "Papá - +56 9 3210 9876", medical: "Alergia a mariscos" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState('Todas');
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('2026-11-14');
  const [attendanceList, setAttendanceList] = useState({ 1: true, 2: true, 3: false, 4: true, 5: true, 6: false });

  const units = ["Todas", ...Object.keys(STAGES_BY_UNIT)];

  const filteredMembers = members.filter(m => {
    const matchesUnit = selectedUnit === 'Todas' || m.unit === selectedUnit;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.patrol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  const toggleAttendance = (id) => {
    setAttendanceList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateStage = (id, newStage) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, stage: newStage } : m));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-red-950 text-white shadow-xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <ScoutBadge className="w-16 h-16 transform hover:rotate-6 transition-transform cursor-pointer drop-shadow-md" />
            <div>
              <h1 className="text-2xl font-black tracking-wide text-white uppercase">Grupo Guía Scout Padre Hurtado</h1>
              <p className="text-xs font-semibold text-amber-300 tracking-wider">DISTRITO CHILLÁN • REGIONAL ÑUBLE</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-red-900/60 p-1.5 rounded-xl border border-red-800">
            {[
              { id: 'dashboard', label: 'Inicio', icon: Shield },
              { id: 'members', label: 'Integrantes', icon: Users },
              { id: 'attendance', label: 'Asistencia', icon: Calendar },
              { id: 'progression', label: 'Progresión', icon: Award },
              { id: 'finances', label: 'Finanzas', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-amber-400 text-red-950 shadow-md font-bold' 
                      : 'text-red-100 hover:bg-red-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-8 bg-gradient-to-r from-red-900 via-red-800 to-rose-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden border border-red-700">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-red-950 font-extrabold text-xs rounded-full uppercase tracking-wider mb-2">Sistema de Gestión Institucional</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Siempre Listos para Servir</h2>
            <p className="mt-2 text-red-100 text-sm leading-relaxed">
              Plataforma de seguimiento para la progresión según el esquema oficial AGSCH, registro de actividades sabatinas y control de unidades del Grupo Padre Hurtado.
            </p>
          </div>
          <ScoutBadge className="absolute -right-10 -bottom-10 w-64 h-64 opacity-15 pointer-events-none" />
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-xl text-red-700"><Users className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Beneficiarios Activos</p>
                  <p className="text-2xl font-black text-slate-800">{members.length}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-xl text-amber-700"><Calendar className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Asistencia Promedio</p>
                  <p className="text-2xl font-black text-slate-800">83%</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700"><Award className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Etapas Entregadas</p>
                  <p className="text-2xl font-black text-slate-800">14</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-700"><DollarSign className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Fondo en Caja</p>
                  <p className="text-2xl font-black text-slate-800">$485.000</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-700" />
                Unidades del Grupo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(STAGES_BY_UNIT).map((unitName) => {
                  const count = members.filter(m => m.unit === unitName).length;
                  return (
                    <div key={unitName} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 text-sm">{unitName}</span>
                        <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">{count} Scouts</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Etapas: <span className="font-medium text-slate-700">{STAGES_BY_UNIT[unitName].join(" → ")}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unidad:</span>
                <select 
                  value={selectedUnit} 
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="bg-slate-100 border-none rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-red-500"
                >
                  {units.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o patrulla..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500">
                  <tr>
                    <th className="p-4">Nombre</th>
                    <th className="p-4">Unidad / Patrulla</th>
                    <th className="p-4">Etapa AGSCH</th>
                    <th className="p-4">Contacto</th>
                    <th className="p-4">Estado Cuota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-red-50/40 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{m.name}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-700">{m.unit}</div>
                        <div className="text-xs text-slate-400">{m.patrol}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-md">
                          {m.stage}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-600">
                        <div>{m.phone}</div>
                        <div className="text-slate-400">{m.emergency}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          m.feeStatus === 'Al día' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {m.feeStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Toma de Asistencia Sabatina</h3>
                <p className="text-xs text-slate-500">Marca los integrantes presentes en la reunión</p>
              </div>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-100 font-bold border-none rounded-lg px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {members.map((m) => {
                const isPresent = !!attendanceList[m.id];
                return (
                  <div 
                    key={m.id}
                    onClick={() => toggleAttendance(m.id)}
                    className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                      isPresent 
                        ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{m.name}</p>
                      <p className="text-xs opacity-75">{m.unit} • {m.patrol}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isPresent ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isPresent ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'progression' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-900 text-xs font-semibold">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Las etapas reflejan la nomenclatura oficial de la Asociación de Guías y Scouts de Chile para cada rama.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((m) => {
                const stages = STAGES_BY_UNIT[m.unit] || [];
                return (
                  <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">{m.name}</h4>
                        <p className="text-xs font-medium text-slate-500">{m.unit}</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs font-extrabold px-3 py-1 rounded-full">
                        {m.stage}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avance de Etapa:</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stages.map((stg) => {
                          const isCurrent = m.stage === stg;
                          return (
                            <button
                              key={stg}
                              onClick={() => updateStage(m.id, stg)}
                              className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-all ${
                                isCurrent 
                                  ? 'bg-amber-400 text-red-950 border-amber-500 shadow-sm' 
                                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {stg}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'finances' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Estado Financiero del Grupo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Ingresos Mensuales</p>
                <p className="text-xl font-black text-emerald-600">$120.000</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Gastos Campamento</p>
                <p className="text-xl font-black text-red-600">$45.000</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Saldo Neto Disponible</p>
                <p className="text-xl font-black text-slate-800">$485.000</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}