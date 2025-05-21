
export const generateOptionsLimitePage = (totalItems: number) => {
    const options: { value: number; label: string }[] = [
        { value: 1, label: '1 item' },
        { value: 2, label: '2 items' },
        { value: 3, label: '3 items' },
        { value: 4, label: '4 items' },
        { value: 5, label: '5 items' },
    ];

    if (totalItems > 5) options.push({ value: 10, label: "10 items" });
    if (totalItems > 10) options.push({ value: 25, label: "25 items" });
    if (totalItems > 25) options.push({ value: 50, label: "50 items" });
    if (totalItems > 50) options.push({ value: 10, label: "100 items" });

    return options;
}