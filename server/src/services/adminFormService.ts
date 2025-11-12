import prisma from "../lib/prisma.js";

export async function getAllFormTemplates(
  search: string,
  page: number | undefined,
  pageSize: number | undefined,
  skip: number | undefined,
  status: string[],
  formType: string[]
) {
  const filter: Record<string, unknown> = {};

  if (status.length === 1) {
    // Single status
    const statusForm = status[0];
    if (statusForm) filter.isActive = statusForm;
  } else if (status.length > 1) {
    const statusForms = status.map((s) => s).filter((s) => s);
    if (statusForms.length > 0) filter.isActive = { in: statusForms };
  }

  if (formType.length === 1 && formType[0] !== "ALL") {
    // Single form type
    const type = formType[0];
    if (type) filter.formType = type;
  } else if (formType.length > 1) {
    const types = formType.map((s) => s).filter((s) => s);
    if (types.length > 0) filter.formType = { in: types };
  }

  if (search !== "") {
    page = undefined;
    pageSize = undefined;
    skip = undefined;
    const totalPages = 1;
    const forms = await prisma.formTemplate.findMany({
      where: {
        ...filter,
      },
      include: {
        _count: {
          select: {
            Submissions: true,
          },
        },
        FormGrouping: {
          select: {
            id: true,
            title: true,
            order: true,
            Fields: {
              select: {
                label: true,
                type: true,
                required: true,
                order: true,
                placeholder: true,
                minLength: true,
                maxLength: true,
                multiple: true,
                content: true,
                filter: true,
                Options: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const total = forms.length;
    return {
      data: forms,
      page,
      pageSize,
      total,
      totalPages,
    };
  } else {
    page = page || 1;
    pageSize = pageSize || 10;
    skip = (page - 1) * pageSize;
    const take = pageSize;
    // Fetch total count for pagination
    const total = await prisma.formTemplate.count();
    const totalPages = Math.ceil(total / pageSize);
    // Get total count for pagination

    const forms = await prisma.formTemplate.findMany({
      where: {
        ...filter,
      },
      skip,
      take,
      include: {
        _count: {
          select: {
            Submissions: true,
          },
        },
        FormGrouping: {
          select: {
            id: true,
            title: true,
            order: true,
            Fields: {
              select: {
                label: true,
                type: true,
                required: true,
                order: true,
                placeholder: true,
                minLength: true,
                maxLength: true,
                multiple: true,
                content: true,
                filter: true,
                Options: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: forms,
      page,
      pageSize,
      total,
      totalPages,
    };
  }
}

export async function getFormTemplateById(id: string) {
  return await prisma.formTemplate.findUnique({
    where: { id },
    include: {
      FormGrouping: {
        include: {
          Fields: true,
        },
      },
    },
  });
}

export async function getFormSubmissions(
  formTemplateId: string,
  dateRange?: {
    from?: Date;
    to?: Date;
  }
) {
  const submittedAtFilter: Record<string, Date> = {};
  if (dateRange?.from) submittedAtFilter.gte = dateRange.from;
  if (dateRange?.to) submittedAtFilter.lte = dateRange.to;

  return await prisma.formSubmission.findMany({
    where: {
      formTemplateId,
      ...(Object.keys(submittedAtFilter).length > 0 && {
        submittedAt: submittedAtFilter,
      }),
    },
    include: {
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}

export async function createFormTemplate() {}

export async function deleteFormTemplate(id: string) {
  return await prisma.formTemplate.delete({
    where: { id },
  });
}

export async function updateFormTemplate(id: string) {}

export async function archiveFormTemplate(id: string) {
  return await prisma.formTemplate.update({
    where: { id },
    data: { isActive: "ARCHIVED" },
  });
}

export async function publishFormTemplate(id: string) {
  return await prisma.formTemplate.update({
    where: { id },
    data: { isActive: "ACTIVE" },
  });
}
