export interface Calendar{
    calendar_id: number,
    user_id: number,
    start_date: Date,
    end_date: Date,
    title: string,
    all_day: boolean
}