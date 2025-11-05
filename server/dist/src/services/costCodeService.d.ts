export declare function getCostCodes(): Promise<{
    id: string;
    name: string;
    code: string | null;
    CCTags: {
        id: string;
        name: string;
        description: string | null;
        Jobsites: {
            id: string;
            name: string;
        }[];
    }[];
    isActive: boolean;
}[]>;
//# sourceMappingURL=costCodeService.d.ts.map