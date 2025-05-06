using Api.Interfaces;
using Api.Repositories;
using Api.Services;

DotNetEnv.Env.Load(); 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:8081", "exp://10.5.215.87:8081")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI登録
builder.Services.AddHttpClient();
builder.Services.AddScoped<IVocabRepository, VocabRepository>();
builder.Services.AddScoped<VocabService>();

builder.Services.AddSingleton(static provider =>
{
    var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
    var key = Environment.GetEnvironmentVariable("SUPABASE_API_KEY");

    var options = new Supabase.SupabaseOptions
    {
        AutoConnectRealtime = true,
        AutoRefreshToken = true,
    };

    if (string.IsNullOrEmpty(url))
    {
        throw new ArgumentNullException(nameof(url), "SUPABASE_URL environment variable is not set.");
    }

    var client = new Supabase.Client(url, key, options);
    return client;
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
