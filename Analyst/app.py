import streamlit as st
import pandas as pd
import plotly.express as px
import os

# --- Page Config ---
st.set_page_config(page_title="Auto-Insight Generator", layout="wide")

st.title("📂 Local Folder Insight Generator")
st.markdown("Automatically scanning your local dump folder for data files...")

# --- 1. CONFIGURATION ---
# Hardcoded folder path (using raw string r"..." to handle backslashes correctly)
FOLDER_PATH = r"C:\Users\vijay\OneDrive\Desktop\Analyst\data_visualise\datasets"

# --- 2. HELPER FUNCTION: Smart Plotting Logic ---
def generate_smart_visuals(df):
    """
    Analyzes the dataframe and automatically generates the most appropriate charts.
    """
    # Identify Column Types
    num_cols = df.select_dtypes(include=['float64', 'int64']).columns
    cat_cols = df.select_dtypes(include=['object', 'category']).columns
    date_cols = df.select_dtypes(include=['datetime64']).columns
    
    # A. Time Series Analysis (If dates exist)
    if len(date_cols) > 0 and len(num_cols) > 0:
        st.subheader("📅 Time Series Analysis")
        date_col = date_cols[0]
        for num_col in num_cols[:2]: 
            df_sorted = df.sort_values(by=date_col)
            fig = px.line(df_sorted, x=date_col, y=num_col, title=f"Trend of {num_col} over Time")
            st.plotly_chart(fig, use_container_width=True)
        st.divider()

    # B. Categorical Analysis (Pie & Bar Charts)
    if len(cat_cols) > 0:
        st.subheader("🍰 Categorical Distribution")
        cols = st.columns(2) 
        
        chart_count = 0
        for col in cat_cols:
            unique_count = df[col].nunique()
            if 1 < unique_count < 15:
                fig = px.pie(df, names=col, title=f"Distribution by {col}", hole=0.3)
                cols[chart_count % 2].plotly_chart(fig, use_container_width=True)
                chart_count += 1
            elif 15 <= unique_count < 50:
                top_counts = df[col].value_counts().nlargest(10).reset_index()
                top_counts.columns = [col, 'Count']
                fig = px.bar(top_counts, x=col, y='Count', title=f"Top 10 {col}s")
                cols[chart_count % 2].plotly_chart(fig, use_container_width=True)
                chart_count += 1
        st.divider()

    # C. Numeric Analysis (Histograms)
    if len(num_cols) > 0:
        st.subheader("📊 Numeric Distributions")
        cols_num = st.columns(2)
        for i, col in enumerate(num_cols):
            fig = px.histogram(df, x=col, marginal="box", title=f"Distribution of {col}")
            cols_num[i % 2].plotly_chart(fig, use_container_width=True)
        st.divider()

    # D. Correlation Analysis (Heatmap)
    if len(num_cols) > 1:
        st.subheader("🔗 Correlations")
        corr_matrix = df[num_cols].corr()
        fig_corr = px.imshow(corr_matrix, text_auto=True, aspect="auto", color_continuous_scale='RdBu_r')
        st.plotly_chart(fig_corr, use_container_width=True)


# --- 3. MAIN APPLICATION LOGIC ---

# Check if the hardcoded path actually exists
if os.path.isdir(FOLDER_PATH):
    # List all files in the directory
    all_files = os.listdir(FOLDER_PATH)
    
    # Filter for valid data files only
    supported_files = [f for f in all_files if f.endswith(('.xlsx', '.xls', '.csv'))]
    
    if supported_files:
        # Sidebar Selection
        st.sidebar.header("🗂 Select File")
        selected_file = st.sidebar.selectbox("Available Datasets:", supported_files)
        
        # Display current path info
        st.sidebar.markdown(f"**Source:** `{FOLDER_PATH}`")
        
        # Construct full path
        file_path = os.path.join(FOLDER_PATH, selected_file)
        
        # --- File Processing ---
        try:
            # Determine read method
            if selected_file.endswith('.csv'):
                df = pd.read_csv(file_path)
            else:
                df = pd.read_excel(file_path)

            st.success(f"Loaded: **{selected_file}**")

            # Date Conversion Attempt
            for col in df.columns:
                if df[col].dtype == 'object':
                    try:
                        df[col] = pd.to_datetime(df[col])
                    except:
                        pass
            
            # Show Data Preview
            with st.expander("📄 View Raw Data Frame"):
                st.dataframe(df.head())
                
            # Run Visualization Engine
            generate_smart_visuals(df)
            
        except Exception as e:
            st.error(f"Error reading file: {e}")
            
    else:
        st.warning(f"The folder exists, but no .csv or .xlsx files were found in: {FOLDER_PATH}")
else:
    st.error(f"❌ The system could not find the folder path: {FOLDER_PATH}")
    st.write("Please double-check that this path exists on your computer.")

# --- AI Note ---
st.sidebar.markdown("---")
st.sidebar.info(
    "**Uni-RAG Agent Note:**\n"
    "To analyze patterns *across* these files (e.g., 'Compare Q1 sales in `fileA.xlsx` vs `fileB.csv`'), "
    "we would need to attach the Uni-RAG agent to ingest this folder recursively."
)
