interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem ipsum',
            status: 'pending',
            createAt: Date.now()
        },
        {
            description: 'En progreso: agree in',
            status: 'in-progress',
            createAt: Date.now() - 1000000
        },
        {
            description: 'Terminado: the finish',
            status: 'finished',
            createAt: Date.now() - 10000
        }
    ]
}

