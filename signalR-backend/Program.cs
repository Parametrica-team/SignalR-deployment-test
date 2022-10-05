using signalR_backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<UrbanbotHub>();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:5026", "https://parametrica.work:5026",
                "https://signal-r-deployment-test.vercel.app")
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors();
app.MapHub<UrbanbotHub>("/hub");
//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapHub<UrbanbotHub>("/hub");
//});

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
       new WeatherForecast
       (
           DateTime.Now.AddDays(index),
           Random.Shared.Next(-20, 55),
           summaries[Random.Shared.Next(summaries.Length)]
       ))
        .ToArray();
    return forecast;
});

app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}