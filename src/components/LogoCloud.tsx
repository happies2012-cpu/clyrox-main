import AnimatedSection from './AnimatedSection';

const clientLogos = [
  { name: 'Innovate Corp', logo: 'InnovateCorp' },
  { name: 'Quantum Solutions', logo: 'Quantum' },
  { name: 'Apex Industries', logo: 'Apex' },
  { name: 'Stellar Group', logo: 'Stellar' },
  { name: 'Nexus Enterprises', logo: 'Nexus' },
  { name: 'Vertex Global', logo: 'Vertex' },
];

export default function LogoCloud() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-white/60 mb-12">
            We are proud to partner with a diverse range of clients, from startups to Fortune 500 companies.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {clientLogos.map((client, index) => (
              <div key={index} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <span className="text-2xl font-semibold text-white">{client.logo}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}